---
title: 编译 Nginx 支持 TLS1.3，并使用 acme.sh 获取证书
date: 2018-06-18 01:51:22
tags:
- nginx
- https
- web优化
categories: 教程
cover_img: https://pic.zhih.me/blog/posts/make-your-website-support-tls1.3/cover.jpg
description: 
keywords: tls1.3, openssl安装, nginx开启tls1.3, nginx配置, Let’s Encrypt, SSL证书配置
---

## 前言

TLS1.2 发布于 2008 年 8 月，至今正好有 10 年，随着互联网安全越来越受到重视，新协议 TLS1.3 呼之欲出。值得一提的是，从第一份草案编写至今，已经有几年时间了，截止这篇文章编写，已经是第 28 份草案。在最近的 Chrome 版本更新中也逐步对 TLS1.3 进行支持，Chrome 65 开始默认开启 draft 23、Chrome 68 开始支持 draft 28

TLS1.3 对于 TLS1.2 有重大改写，既提高了安全性又提高了速度，以至于有争议称，应该把它叫做 TLS2.0

关于 TLS1.3 的科普可以看下面的页面

https://wiki.openssl.org/index.php/TLS1.3 
https://zhuanlan.zhihu.com/p/28850798

之前我也写过 Nginx 的 https 的配置 https://zhih.me/nginx-http2-https/ ，当时是使用 TLS1.2 的

碰巧前几天发现 `.ooo` 可以免费用 1 年，就撸了一个 `onmp.ooo` 来做为我 onmp 项目的页面，把它搭在 4 刀年付的 virmach 上，顺便测试 TLS1.3

## 安装

我这里用的系统是 Debian 8

### 安装依赖

```shell
$ apt-get install git gcc make build-essential zlib1g-dev libpcre3-dev
```

### 下载源码和补丁

```shell
$ mkdir -p /usr/src
$ cd /usr/src

$ git clone git://git.openssl.org/openssl.git openssl
$ git clone https://github.com/hakasenyang/openssl-patch.git openssl-patch
$ git clone https://github.com/kn007/patch.git nginx-patch
$ wget https://nginx.org/download/nginx-1.15.0.tar.gz
$ tar zxvf ./nginx-1.15.0.tar.gz 
```

### 给 OpenSSL 打补丁

补丁来自 https://github.com/hakasenyang/openssl-patch

此补丁的目的是让 OpenSSL 支持 TLS1.3 的 23,26,28 草案

```shell
$ cd /usr/src/openssl 
$ patch -p1 < ../openssl-patch/openssl-equal-pre8_ciphers.patch 
```

### 给 Nginx 打补丁

补丁来自 https://github.com/kn007/patch

`nginx 补丁` 添加 SPDY 支持、添加 HTTP2 HPACK 编码支持、添加动态 TLS 记录支持
`fix_nginx_hpack_push_error 补丁` 修复 nginx 的 http2 push 和 http2 hpack 兼容性问题
`nginx_auto_using_PRIORITIZE_CHACHA 补丁` 添加在使用 OpenSSL1.1.1 时 SSL_OP_PRIORITIZE_CHACHA 的支持

```shell
$ cd /usr/src/nginx-1.15.0
$ patch -p1 < ../nginx-patch/nginx.patch 
$ patch -p1 < ../nginx-patch/fix_nginx_hpack_push_error.patch 
$ patch -p1 < ../nginx-patch/nginx_auto_using_PRIORITIZE_CHACHA.patch
```

### 其他编译配置

Nginx 默认会以 debug 模式编译，我们需要注释掉 `/usr/src/nginx-1.15.0/auto/cc/gcc` 中 `CFLAGS="$CFLAGS -g"` 这行，这样可以减少生成文件的大小

### 编译安装

``` shell
$ cd /usr/src/nginx-1.15.0
$ ./configure \
--prefix=/etc/nginx \
--sbin-path=/usr/sbin/nginx \
--conf-path=/etc/nginx/nginx.conf \
--pid-path=/var/run/nginx.pid \
--lock-path=/var/lock/nginx.lock \
--modules-path=/usr/lib/nginx/modules \
--with-compat --with-file-aio --with-threads \
--with-openssl=../openssl \
--with-http_v2_module \
--with-http_v2_hpack_enc \
--with-http_spdy_module \
--with-http_ssl_module \
--with-http_gzip_static_module

$ make 
$ make install
```

Nginx 的可执行文件安装在 `/usr/sbin/` ，Nginx 配置在 `/etc/nginx/` 里

## 配置

Nginx 已经安装上了，现在我们来配置网站，让它跑起来

### Nginx 全局配置

把以下内容覆盖填入 `/etc/nginx/nginx.conf` 

```
worker_processes auto;
pid /var/run/nginx.pid;

error_log  /var/log/nginx/error.log;

events {
  use epoll;
  multi_accept on;
  worker_connections 1024;
}

http {
    charset utf-8;
    include /etc/nginx/mime.types;
    default_type  application/octet-stream;

    access_log  /var/log/nginx/access.log;

    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 60;

    sendfile on;
    sendfile_max_chunk 256k; 
    aio threads;
    directio 512k;
    output_buffers 1 128k;

    gzip on; 
    gzip_vary on;
    gzip_proxied any;
    gzip_min_length 1k;
    gzip_buffers 4 8k;
    gzip_comp_level 2;
    gzip_disable  "msie6";
    gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript application/javascript image/svg+xml;

    include /etc/nginx/vhost/*.conf;
}
```

### Nginx 站点配置

我们已经在全局配置里设置了包含 `/etc/nginx/vhost/` 目录下的 conf 文件

```shell
$ mkdir -p /etc/nginx/vhost
```

然后在 `/etc/nginx/vhost/` 里创建站点配置，比如我的是 `onmp.ooo.conf` 

```
server {
  listen 80;
  server_name onmp.ooo;
  root /wwwroot/onmp.ooo;
  location / {
    index  index.html;
  }
}
```

这样 HTTP 的站点配置就弄好了，不过还站点还没页面，我们把 Nginx 的欢迎也面给放进去

```shell
$ mkdir -p /wwwroot/onmp.ooo
$ cp /usr/local/nginx/html/index.html /wwwroot/onmp.ooo/
$ nginx
```

启动 Nginx 后 HTTP 页面就正常了，打开 onmp.ooo 就能看到 Welcome to nginx!

### 签发证书

配置 HTTPS 首先要有证书，我这里是使用 [acme.sh](https://github.com/Neilpang/acme.sh) 自动颁发 Let’s Encrypt 的证书

#### 安装工具

```shell
$ apt-get install cron socat
```

#### 获取 acme.sh

```shell
$ curl  https://get.acme.sh | sh 
```

重启终端，如果你使用 zsh 可以这样 `source ~/.zshrc`

#### 生成证书

使用 http 方式验证域名，这是我们先搭建 HTTP 站点的原因，接下来指定域名、指定站点目录，开始签发

```shell
$ acme.sh --issue -d onmp.ooo --webroot /wwwroot/onmp.ooo/ --keylength ec-256 --nginx
```

如果是多域名，可以使用 -d 参数添加，如：`-d www.onmp.ooo` 
`--keylength ec-256` 是签发 ECC 类型的证书，它的安全性更高，删除则使用默认的 RSA 证书


#### 复制证书

证书已经签发了，不过默认是保存在 `~/.acme.sh/` 里

```shell
$ acme.sh --ecc --installcert -d onmp.ooo \
          --key-file /etc/nginx/ssl/onmp.ooo.key \
          --fullchain-file /etc/nginx/ssl/onmp.ooo.cer \
          --reloadcmd "nginx -s reload"
```

指定域名，指定证书保存目录，我这里设置在 `/etc/nginx/ssl/`，指定 Nginx 重载命令，如果签发的不是 ECC 证书，把 `--ecc` 参数去掉

这样使用 acme.sh 就完成了证书的签发，如果证书快要过期了，脚本会自动更新证书

脚本自动更新，可以使用以下命令

```shell
$ acme.sh --upgrade --auto-upgrade 
```

### HTTPS 站点配置

因为我给 OpenSSL 打的是 pre8_ciphers 补丁，所以 ssl_ciphers 配置文件如下，如果你打的是别的补丁，则需要查看 https://github.com/hakasenyang/openssl-patch 给的配置

```
server {
  listen      80;
  server_name onmp.ooo;
  return 301 https://onmp.ooo$request_uri;
}

server {
  listen 443 ssl http2;
  server_name onmp.ooo;

  root /wwwroot/onmp.ooo;

  ssl_certificate       /etc/nginx/ssl/onmp.ooo.cer;
  ssl_certificate_key   /etc/nginx/ssl/onmp.ooo.key;

  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_ciphers [TLS13+AESGCM+AES128|TLS13+AESGCM+AES256|TLS13+CHACHA20]:[EECDH+ECDSA+AESGCM+AES128|EECDH+ECDSA+CHACHA20]:EECDH+ECDSA+AESGCM+AES256:EECDH+ECDSA+AES128+SHA:EECDH+ECDSA+AES256+SHA:[EECDH+aRSA+AESGCM+AES128|EECDH+aRSA+CHACHA20]:EECDH+aRSA+AESGCM+AES256:EECDH+aRSA+AES128+SHA:EECDH+aRSA+AES256+SHA:RSA+AES128+SHA:RSA+AES256+SHA:RSA+3DES;
  ssl_ecdh_curve X25519:P-256:P-384;
  ssl_prefer_server_ciphers on;

  ssl_session_cache shared:SSL:50m;
  ssl_session_timeout 1d;
  ssl_session_tickets on;

  ssl_stapling on;
  ssl_stapling_verify on;

  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload";

  location / {
    index  index.html;
    http2_push /style.css;
  }

  location ~ .*\.(gif|jpg|jpeg|png|bmp|swf|ico)$ {
    expires 30d;
  }

  location ~ .*\.(js|css)?$ {
    expires 15d;
  }

  location ~ /.git/ {
    deny all;
  }
}
```

以上就是完整的站点配置文件，覆盖 `/etc/nginx/vhost/onmp.ooo.conf` 后，使用 `nginx -s reload` 重载 Nginx 再打开站点就能看到 HTTPS 的页面了

## 验证

在 Chrome 65 或更新的版本中，打开开发者工具的 Security 菜单，就能在里面看到 站点是否以 TLS1.3 连接

![chrome](https://pic.zhih.me/blog/posts/make-your-website-support-tls1.3/chrome.jpg)

或者可以到 SSL Server Test：https://www.ssllabs.com/ssltest/index.html 进行测试

![ssllabs](https://pic.zhih.me/blog/posts/make-your-website-support-tls1.3/ssllabs.jpg)

我只开启了 TLSv1.2 TLSv1.3 的支持，如果需要，你可以自己增加其他协议的支持

## 后话

人们的生活已经离不开网络，所以网络安全在现在和未来都至关重要，曾经很多站长都以 HTTPS 影响站点速度为由，又或者说 SSL 证书昂贵，拒绝配 HTTPS，而随着技术的迭代升级，配置 HTTPS+HTTPS2 能提高网站速度，而 SSL 不仅可以免费获取，还可以使用命令自动获取自动更新，在我看来已经没有理由不配置 HTTPS 了，所以希望各位站长，都赶紧上车吧





