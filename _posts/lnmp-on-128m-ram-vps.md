---
title: 我是如何在 128M 内存的 vps 上安装 lnmp 的
date: 2018-03-13 22:07:59
tags: 
- Linux
- lnmp
categories: 教程
cover_img: https://pic.zhih.me/blog/posts/lnmp-on-128m-ram-vps/cover.jpg
description: 作为一个整天折腾 VPS 的博主，手里少不了各种便宜的低配小鸡，今天我要祭出我那经常被 BAN 😒的 128M 内存小鸡，为大家写一篇小内存 VPS 安装 lnmp 的教程，并且，我要让它把 WordPress 跑起来
keywords: OVZ, VPS, lnmp, Linux
---

封面那张图和这篇文章无关😂，那是之前在学校的时候拍的，一台 64M 古董大脑壳装 win me，然后玩三维弹球🤪 2333

![三维弹球](https://pic.zhih.me/blog/posts/lnmp-on-128m-ram-vps/winme.jpg)

## 前言

作为一个整天折腾 VPS 的博主，手里少不了各种便宜的低配小鸡，今天我要祭出我那经常被 BAN 😒的 128M 内存小鸡，为大家写一篇小内存 VPS 安装 lnmp 的教程，并且，我要让它把 WordPress 跑起来。

先上配置：
CPU：Intel(R) Xeon(R) CPU X5560 @ 2.80GHz 单核
内存：128M
硬盘：2GB
系统：debian-8.0-x86_64
虚拟化：openVZ

可以说这小鸡是相当极限了，当然我还有一台传家宝 64M 内存的，但是在上面装 lnmp 遇到了一些麻烦，就放弃了😂

## 一、软件源

由于配置太低，lnmp 所需的 Nginx MySQL PHP 要是用编译的方式安装，在过程中基本就宕机了，所以这里才用的是 apt 的方式进行安装。

在执行以下操作前，建议先运行一下命令，更新和安装一些包，以防出错

```
$ apt-get update && apt-get upgrade
$ apt-get install curl wget
```

### 1. 添加软件源

系统是 debian8，自带源内没有 PHP7，所以添加一个 [dotdeb](http://www.dotdeb.org) 源，它里面有 debian7、debian8 的各种软件包，同时他们也提供世界各地的[镜像](https://www.dotdeb.org/mirrors/)。

```
$ vi /etc/apt/sources.list
# 在 sources.list 里添加两行 (deb 和 deb-src)
```

```
# 我的 vps 在美帝，所以添加了他们的美国镜像
deb http://mirrors.asnet.am/dotdeb/ jessie all
deb-src http://mirrors.asnet.am/dotdeb/ jessie all
```

如果你直接从官网复制过来，或者是你的系统是 debian7，记得修改网址后面的版本名。

### 2. 安装 GnuPG 密匙

GPG主要是实现官方发布的包的签名。

```
$ wget https://www.dotdeb.org/dotdeb.gpg
$ sudo apt-key add dotdeb.gpg
```

### 3. 源添加完毕

运行 `apt-get update && apt-get upgrade`，现在你应该能从 dotdeb 上获取软件了。

## 二、软件包

### 1. Nginx

```
$ apt-get install nginx -y
```

打开浏览器，输入你的 IP，能显示 `Welcome to nginx!`，就说明安装成功了。

### 2. PHP7

```
$ apt-get install php7.0 php7.0-cgi php7.0-cli php7.0-fpm php7.0-mysql php7.0-odbc php7.0-opcache -y
```

以上我只安装了几个 module，如有需要，自己安装其他的。

安装成功后，运行 `php -v` 可以看到 PHP 的版本信息。

### 3. MySQL

```
$ apt-get install mysql-client mysql-server -y
```

输入命令后，会进行安装，过程中会有输入密码的提示框，按提示操作即可。

运行 `mysql -u root -p`，输入密码，能进入 MySQL 就说明装上了。

## 三、安装 WordPress

至此 lnmp 已经安装完毕了，我们先看看相关的管理命令再安装 WordPress。

```
# 启动|停止|重启
$ /etc/init.d/nginx start|stop|restart
$ /etc/init.d/php7.0-fpm start|stop|restart
$ /etc/init.d/mysql start|stop|restart
```

好了，咱们开始安装 WordPress 

这部分我就不多说了，配置教程之类的很多，WP官网的安装文档也相当清晰。

其实就是以下步骤：

1. 创建 Nginx 配置文件
2. 在 MySQL 里创建数据库
3. 下载、解压 WordPress 程序包
4. 进入网页安装

跑得动没啥，就是看看这小鸡的承载能力，我这里使用 ab 命令对首页进行压力测试，并且首页也就一篇文章列表，情况如下图：

![压力测试](https://pic.zhih.me/blog/posts/lnmp-on-128m-ram-vps/压力测试.jpg)

在做100个并发，访问10000次的测试中，在进行到第7143个请求的时候，小鸡爆了，完全无法访问，过了一会才恢复过来，看来对它的要求不能太高啊😂。

当然，使用WP也要使用静态化插件才能提高承载能力，我就懒得试了

## 最后

其实这篇文章就是给小鸡跑个 lnmp，给它点压力，我过过手瘾，也证实一下 128M 的小内存vps是有能力搭建访问量少的 WP 博客的。

但是，既然内存这么小，何不用 hexo 那种静态博客呢。

这篇文章仅作为新手安装 lnmp 教程，照顾那些低价买了低配置 vps 的同学，祝你们折腾愉快。

如果你想购买 vps，可以看看 [DigitalOcean](https://m.do.co/c/5ddae9064d7f)

这里是我的优惠链接：[https://m.do.co/c/5ddae9064d7f](https://m.do.co/c/5ddae9064d7f)，通过这个链接注册，你可以得到10美元用来购买vps。
