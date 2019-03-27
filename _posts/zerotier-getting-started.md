---
title: ZeroTier内网穿透教程
cover_img: https://pic.zhih.me/blog/posts/zerotier-getting-started/cover.jpg
date: 2018-12-28 18:39:41
tags: 
- Linux
- 内网穿透
categories: 教程
description: 使用ZeroTier来内网穿透，在外地也能访问家里或公司里的设备，让网络设备异地组网，实现在跨局域网或跨广域网的互相访问
keywords: linux, 内网穿透, 局域网, DDNS, FRP, Ngrok
ld_json_img: https://pic.zhih.me/blog/posts/zerotier-getting-started/android-test.jpg
---

## 前言

有时候需要在外边访问家里的设备，而众所周知一般家里都没有固定 IP 的，这时候就要内网穿透了，说到穿透的时候，大家都会提到 DDNS(动态域名解析)，或者使用反向代理的方式如 FRP、Ngrok。

首先说说 DDNS，这种方式使用起来很方便，只要设置好相应的服务提供商的 API，就能做到每次 IP 变化后自动解析，这样不管家里 IP 怎么变，用域名都能访问回家。这里最大的硬伤就是**公网IP**，有些朋友的带宽就是个大局域网，路由器只能获取到上一级内网的 IP，这时就 GG 了。

然后是 FRP、Ngrok 这样的反向代理程序，通过服务器转发数据来达到外网访问的目的，这样就需要自己有个 VPS，或者使用他人搭建的服务，据我所知的免费服务都是限速的，要是自己搭建的话，体验就要看服务器的**网络质量**了。

现在我们就来看看，**不需要公网 IP，不依赖服务端网络性能的 ZeroTier**。

## 简介

[ZeroTier 官网](https://www.zerotier.com)上说

>ZeroTier is a smart Ethernet switch for planet Earth.

!!! 适用于地球的智能网络交换机 ...

它是一个分布式网络虚拟机管理程序，建立在加密安全的全球对等网络之上。它提供与企业 SDN 交换机同等的高级网络虚拟化和管理功能，而且可以跨本地和广域网并连接几乎任何类型的应用程序或设备。

好吧😥，有点牛逼

而说到主要功能，就是可以把多个不同网络的设备连接在一起，用来就像在一个局域网下

例如，我在路由器上装了 ZeroTier，路由器挂了一个硬盘，而现在我在外边想要访问这个硬盘，那么只需要运行电脑上的 ZeroTier，就能通过 Samba、FTP 等方式访问硬盘，而且看起来就像我就在家里一样。

## 基本原理介绍

说白了就是 P2P(Peer to Peer)，而且组织方式很像 DNS(关于 DNS 可以看[这里](https://zhih.me/how-the-web-works/#DNS-%E6%9F%A5%E8%AF%A2))

根服务器 R 记录了路径信息，设备 A 能通过**ZeroTier唯一地址标识**找到需要连接的设备 B

这个过程如下：

1. A 想要将数据包发送到 B，但由于它没有直接路径，因此将其向上发送到 R。
2. 如果 R 有直接链接到 B，它会转发数据包给 B。否则它会继续向上游发送数据包，直到达到行星根(planet)。行星根知道所有节点，所以如果 B 在线，最终数据包将到达 B。
3. R 还向 A 发送一个名为**会和**的消息，包含有关它如何到达 B 的提示。同时，将**会和**发给 B，通知 B 它如何到达 A。
4. A 和 B 获取它们的会合消息并尝试相互发送测试消息，可能会对 NAT 或状态防火墙进行穿透。如果这样可以建立直接链路，则不再需要中继。
5. 如果无法建立直接路径，则通信可以继续中继(速度慢)

ZeroTier 官方搭建了一个行星根服务器叫做地球 Earth，行星根服务器唯一的且是免费的，它记录了所有的路径信息，一般情况下大家都直接用的这个。除此之外还有 12 个遍布全球的根服务器，这些是收费的服务。所以如果使用免费套餐，连接时的延迟可能会很高，另外由于 Earth 在国外，一些不确定因素可能会影响到使用。考虑到网络的不确定性，ZeroTier 能自己创建根服务器月球 Moons，这样就能在大局域网中得到更好的体验了。

## 安装

ZeroTier 是跨平台的，能安装在几乎任何平台

Windows、macOS、Linux、iOS、Android、QNAP、Synology、西数 MyCloud NAS，下载地址：https://www.zerotier.com/download.shtml

路由器推荐安装 [Entware](https://zhih.me/tags/entware/) 后使用 `opkg install zerotier` 命令安装

## ZeroTier使用教程

因为我们没有自己创建 Moons 服务器，现在就先使用 ZeroTier 提供的服务

### 注册

地址：https://my.zerotier.com/

![注册](https://pic.zhih.me/blog/posts/zerotier-getting-started/create-account.jpg)

注册之后是这样的，保持默认就好，免费套餐能连接 100 个设备，一般人够用了

![账户](https://pic.zhih.me/blog/posts/zerotier-getting-started/account.jpg)

### 创建网络

![创建网络](https://pic.zhih.me/blog/posts/zerotier-getting-started/create-network.jpg)

创建一个新的网络之后，我们得到一个 Network ID，这个在后面的设备连接时需要用到，点击刚刚创建的网络我们可以设置更多选项

![网络设置](https://pic.zhih.me/blog/posts/zerotier-getting-started/network-setting.jpg)

默认的设置就可以用了，右边 IPv4 的设置就是分配设备内网 IP 网段，其他的设置可以在 Setting help 里看到说明，不了解的不建议乱设置，如果不小心把自己的网络暴露在外部，会相当危险

### 连接

直接在客户端输入刚才创建的 Network ID

**电脑**

![macOS](https://pic.zhih.me/blog/posts/zerotier-getting-started/macos-join.jpg)

**路由器**

我这里使用的是安装了 [Entware](https://zhih.me/tags/entware/) 的 LEDE

```bash
# 启动
zerotier-one -d

# 获取地址和服务状态
zerotier-cli status

# 加入、离开、列出网络
zerotier-cli join # Network ID
zerotier-cli leave # Network ID
zerotier-cli listnetworks
```

### 允许连接

后台设置默认是需要 Auth 才能连接的，在客户端申请加入网络后，需要在后台允许一下

![允许加入](https://pic.zhih.me/blog/posts/zerotier-getting-started/members.jpg)

### 测试连接

为了测试不同网络访问，我添加了一台安卓手机，在移动网络下直接使用分配给路由器的 IP，连接了 ssh 和 [onmp](https://zhih.me/tags/onmp/) 创建的 PHP 探针页面，而且速度还算不错，宽带是电信的，手机是联通的，下文件时能有个 800k/s，不知道瓶颈在哪

![安卓](https://pic.zhih.me/blog/posts/zerotier-getting-started/android-test.jpg)

## 结语

目前 IPv6 还没得到普及，虽然我这里已经能有 IPv6 地址并且能 IPv6 站点了，奈何不是固定 IP，也不知道哪时才能人手一个固定 IP。就目前情况来看，使用 ZeroTier 来做内网穿透还是不错的，使用门槛较低，可用性也还行，值得一试。 

>本文章发表于底噪博客 https://zhih.me , 转载请注明



