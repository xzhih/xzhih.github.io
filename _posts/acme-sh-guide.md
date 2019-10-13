---
title: 使用acme.sh获取免费SSL证书
date: 2018-11-06 04:04:25
tags:
- nginx
- https
- web
categories: 教程
cover_img: https://pic.zhih.me/blog/posts/acme-sh-guide/cover.jpg
description: 最简单的acme.sh使用教程，让你的网站支持https。acme.sh是一个 ACME(自动化证书管理环境) 脚本，可以从 letsencrypt 生成免费的证书 ...
keywords: acme.sh, Let’s Encrypt, SSL证书, 免费SSL, https
---

## 引言

[acme.sh](https://github.com/Neilpang/acme.sh) 是一个 ACME(自动化证书管理环境) 脚本，可以从 letsencrypt 生成免费的证书。

本来这个教程是写在 [编译Nginx支持TLS1.3](https://zhih.me/make-your-website-support-tls1-3/) 那篇帖子里的，后来感觉还是单独拿出来比较好，即能让那篇教程更简洁，也能更方便的让需要的人看到这个教程。

## 安装工具

```bash
apt-get install cron socat -y
```

## 获取 acme.sh

```bash
curl  https://get.acme.sh | sh 
```

重启终端，如果你使用 zsh 可以这样 `source ~/.zshrc`

## 生成证书

使用 http 方式验证域名，需要先搭建 HTTP 站点，这里使用 acme.sh 自带的 webserver，所以先把 nginx 停掉

```bash
service nginx stop
```

接下来指定域名，开始签发

```bash
acme.sh --issue -d onmp.ooo \
        --keylength ec-256 \
        --standalone
```

如果是多域名，可以使用 -d 参数添加，如：`-d www.onmp.ooo` 
`--keylength ec-256` 是签发 ECC 类型的证书，它的安全性更高，删除则使用默认的 RSA 证书


## 复制证书

证书已经签发了，不过默认是保存在 `~/.acme.sh/` 里

```bash
acme.sh --ecc --installcert -d onmp.ooo \
        --key-file /usr/local/nginx/conf/ssl/onmp.ooo.key \
        --fullchain-file /usr/local/nginx/conf/ssl/onmp.ooo.cer \
        --reloadcmd "service nginx restart"
```

指定域名，指定证书保存目录，我这里设置在 `/usr/local/nginx/conf/ssl/`，指定 Nginx 重载命令，如果签发的不是 ECC 证书，把 `--ecc` 参数去掉

这样使用 acme.sh 就完成了证书的签发，如果证书快要过期了，脚本会自动更新证书

脚本自动更新，可以使用以下命令

```bash
acme.sh --upgrade --auto-upgrade 
```

## 证书安装

证书已经获取并且可以自动更新了，具体安装方法看 [编译Nginx支持TLS1.3](https://zhih.me/make-your-website-support-tls1-3/) 

>本文章发表于底噪博客 https://zhih.me , 转载请注明
>直接偷的人，你打球真蔡
