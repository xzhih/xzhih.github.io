---
title: Nginx配置HTTPS以及使用HTTP2服务器推送
date: 2018-04-17 20:46:56
tags: 
- nginx
- https
- web
categories: 教程 
cover_img: https://pic.zhih.me/blog/posts/nginx-http2-https/cover.jpg
description: nginx配置HTTPS教程，教你如何开启http2和服务器推送，加速你的网站，以我这个博客为例，即使VPS每秒只能跑128kb的资源，也能快速的打开网站，很多人说做产品要追求用户体验，作为一个用户，我认为一个网站最重要的就是打开的速度。所以在自己搭网站的时候，一直痴心于提高网站的速度...
keywords: web性能优化, http2, http push, nginx服务器推送
ld_json_img: https://pic.zhih.me/blog/posts/nginx-http2-https/blogspeed.jpg
---

## 引言

我的小博客在SSL Labs 的 [SSL Server Test](https://www.ssllabs.com/ssltest/index.html) 中得到了 A+ 的好成绩

![SSL Server Test](https://pic.zhih.me/blog/posts/nginx-http2-https/cover.jpg)

虽然没搭建过什么大站，但是这几年也积累了不少经验，今天就说说在 Nginx 上配置 HTTPS、HTTP/2，并开启服务器推送。

很多人说做产品要追求用户体验，作为一个用户，我认为一个网站最重要的就是打开的速度。所以在自己搭网站的时候，一直痴心于提高网站的速度。

以我这个博客为例，自己移植并改写了主题，资源都进行了压缩，公共静态资源都用了公共 CDN，因为 VPS 的带宽只有可怜的 1M，所以图片资源都进行了压缩并存到了腾讯云 COS，使用 CDN 进行加速。这样的一堆加成之后，即使 VPS 每秒只能跑 128kb 的资源，也能快速的打开网站。

## 优化什么

web 性能优化的门路很多，有空我再另开一篇我对优化的见解说说，但是一般对于我博客这种静态站来说，真正影响速度的是，带宽、延迟、请求数、资源大小。带宽大、延迟低的 vps 贵，为减少服务器相关的开销，只能靠压缩资源和减少请求了。

网速慢的时候下载大文件特别操蛋，这大家都知道，那打开网页亦是如此，但速度不仅取决于客户端的网速，还有服务端的。既然搞不来网速快的服务器，那只能把文件减小咯，把什么 JS、CSS、图片都给压缩咯，这下总可以了吧。

**但是，压缩就足够了吗？**

不够，因为浏览器有个并发连接数限制，也就是说，浏览器对每个域名的并发请求是有限的，同一时间只能做几个请求，然后再等下一轮请求。具体到实际体验就是，当你的一个网页内需要加载的资源数量较多的时候，浏览器分几次才能把资源下载下来，这就影响到网页加载速度了。

**所以，该怎么办？**

减少请求数呗，很多时候都这样说，但是一般来说，减少请求数意味着对各种资源最内联处理，而缺点很明显，内联 CSS/JS 不好维护、内联图片不会有浏览器缓存、增大单个网页的体积，当然这些也不是绝对，至少以我这个静态博客来说，都是弊端。

**艹，一不小心都偏离重点了**

好吧，开始说说主题吧。

## HTTP2.0

关于是什么，干什么的，怎么来的，这些问题，自己去看[维基百科](https://zh.wikipedia.org/wiki/HTTP/2)去，还有这一篇谷歌高性能 web 工程师写的文章：https://hpbn.co/http2

我这里就简单说一下

一句话说就是，**解决了上面遗留下来问题**

对于我们来说，提升体验的是它的这 3 个特性

- 头压缩
    + 压缩请求头大小，减少请求时间

- 请求和响应复用
    + 并行交错多个请求，不会阻塞任何请求
    + 并行传输多个响应，而不会对任何一个进行阻塞
    + 使用单个连接并行传送多个请求和响应
    + 消除不必要的延迟并提高可用带宽的利用率

![请求和响应复用](https://pic.zhih.me/blog/posts/nginx-http2-https/multiplexing.jpg)

- 服务器推送
    + 除了对原始请求的响应之外，服务器还可以 向客户端推送额外的资源

![服务器推送](https://pic.zhih.me/blog/posts/nginx-http2-https/server-push.jpg)

*以上图片来自https://hpbn.co/http2*

如果把浏览器和服务器通信比作你和朋友聊天，那么在这个场景下，会是这样的

- HTTP1.1（目前主流协议）
    + 你发一句消息给朋友，需要等朋友回复你了才能发第二句
    + 你不主动问候朋友，朋友不会理你

- HTTP2.0 
    + 你可以一次发多条消息了，朋友也会一次性回复你
    + 你的朋友会主动问候你

是不是美滋滋

## 配置 HTTPS

我的新文章，更详细的 HTTPS 配置，可以到这里查看

https://zhih.me/make-your-website-support-tls1-3/

本来这篇文章就是要写写，如何配置 HTTPS 的，想不到扯出这么多

关于为什么要配置 HTTPS，问你自己吧

### 申请 SSL 证书

随着 HTTPS 的普及，出现了很多的免费证书，比如 Let’s Encrypt，但我打算之后再写一篇文章详细写写。

或者更方便的是到阿里云、腾讯云的后台申请免费的证书，也很简单。

### 安装 Nginx

版本装最新的就好，如果服务器自带的源不够新，可以用 Nginx 的官方源，具体使用方式在他们的官网已经给出，不在详细说明。

http://nginx.org/en/linux_packages.html

### 安装 OpenSSL

开启 HTTPS 需要 OpenSSL 版本 >= 1.0.1，我用的 Debian9 自带 1.1.0

你可以使用 `openssl version` 这个命令查看，不够新的自行升级

### Nginx 配置

#### HTTP 301 跳转 HTTPS

大多浏览器默认访问 HTTP，所以我们需要让它跳转到 HTTPS 上

以我的博客为例

```
server {
    listen      80;
    server_name zhih.me www.zhih.me;
    return 301 https://zhih.me$request_uri;
}
```

### HTTP2 和 HTTPS

目前所有支持 HTTP/2 的浏览器都是基于 TLS 1.2 协议之上构建 HTTP/2 的，所以要使用 HTTP/2 必须开启 HTTPS

以下是我博客服务器 HTTPS 部分的完整配置，gzip 压缩等其他设置我放到了 nginx.conf 里

我的配置可能会更新，可以去 [编译Nginx支持TLS1.3](https://zhih.me/make-your-website-support-tls1-3/) 那篇帖子里看，一切以那里的为最新

```
server {
    listen 443 ssl http2;
    server_name zhih.me www.zhih.me;

    if ($host != zhih.me) {
        return 301 https://zhih.me$request_uri;
    }
    root  /站点目录;

    ssl_certificate       /ssl/zhih.me.crt;
    ssl_certificate_key   /ssl/zhih.me.key;

    ssl_protocols TLSv1.2;
    ssl_ciphers 'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256';
    ssl_prefer_server_ciphers on;

    ssl_session_cache shared:SSL:50m;
    ssl_session_timeout 1d;
    ssl_session_tickets on;
    
    ssl_stapling on;
    ssl_stapling_verify on;
    
    resolver 119.29.29.29 8.8.8.8 valid=300s;
    resolver_timeout 10s;

    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload";

    location / {
        index  index.html;
        http2_push /css/allinone.min.css;
    }
}
```

### 详细说明

#### 开启 HTTP2

```
listen 443 ssl http2;
```

监听 443 端口，HTTPS 协议走这个端口，HTTP 走的是 80

只需要在 SSL 后面加上就能开启 HTTP2 

>注意：我这配置里边的 301 跳转是从 www.zhih.me 跳转到 zhih.me，如果你不需要，可以不像这样设置

#### 开启服务器推送

```
location / {
        index  index.html;
        http2_push /css/allinone.min.css;
    }
```

我这里把 `/css` 目录下的 `allinone.min.css` 文件添加了服务器推送

之后在浏览器开发者控制台里的效果就是这样的

![服务器推送](https://pic.zhih.me/blog/posts/nginx-http2-https/push.jpg)

#### 其他配置

`ssl_certificate` 是公钥，`ssl_certificate_key` 是私钥，后面写文件路径

`ssl_protocols` 加密协议，Nginx 默认是 SSLv3 TLSv1 TLSv1.1 TLSv1.2，但是 SSLv3 目前还存在漏洞，不建议使用，而我做的比较激进，只保留了 TLSv1.2，因为我相信，能访问这个博客的人，用的浏览器都不会很低级。

`ssl_ciphers` 加密算法，因为不同浏览器优先使用的算法不同，我们可以在服务端设置优先级和禁止使用的算法，并结合 `ssl_prefer_server_ciphers on` 来让浏览器优先选择我们设置好的。

`ssl_session_cache` SSL 会话缓存

`ssl_session_timeout` SSL 会话缓存过期时间

`add_header Strict-Transport-Security max-age=15768000` 开启 HSTS，后面是缓存时间

#### 重启 Nginx

保存配置，重启 Nginx 生效

```bash
nginx -s reload
```

#### 查看效果

HTTPS 生效结果查看很简单，直接打开你的网站，看到浏览器前面有个锁头就行了

我们主要看 HTTP2 是否生效，使用 curl 命令，curl 需要支持 HTTPS HTTP2

```bash
curl --http2 -I https://zhih.me
```

![效果](https://pic.zhih.me/blog/posts/nginx-http2-https/end.jpg)

教程写到这里就告一段落了，你可能就要问了，HTTP/2 加速了你的博客了吗？

一定程度上是的，但由于我用了 CDN，在自己服务器上请求的资源并不会很明显，博客上只有一个自定义样式表和基础的静态网页需要从我自己服务器上获取，其他的各种类库我都使用了 CDN，文章里的图片放到了腾讯云 COS 搭配 CDN 使用

每次有人访问时，请求了静态页面，HTTP2 的服务器推送会把自定义样式表推送过去，就减少了一次请求，用的 CDN 也启用了 HTTP2，所以可以在我这 1Mbps 小水管上实现 0.9s 打开 13 个请求、近 500kb 大小的页面

![博客速度测试](https://pic.zhih.me/blog/posts/nginx-http2-https/blogspeed.jpg)

## 其他工具

Moz 推荐的 HTTPS 配置（自动配置）：https://mozilla.github.io/server-side-tls/ssl-config-generator/

SSL Server Test：https://www.ssllabs.com/ssltest/index.html

不服跑个分

## 结语

技术的升级迭代潜移默化的影响着大家的生活，从 1960 年 Ted Nelson 构思 HTTP 协议，到 1996 年 HTTP/1.0 被正式作为标准，再到 1997 年公布并一直沿用至今的 HTTP/1.1，可以说它是人类互联网的基石，2015 年发布了 HTTP2，它为网页性能而生，他以更快，更强，更安全的特性，逐渐被的被各大公司使用，相信全面普及 HTTPS/HTTP2 不会有太长的时间。

>本文章发表于底噪博客 https://zhih.me , 转载请注明
>直接偷的人，你打球真蔡





