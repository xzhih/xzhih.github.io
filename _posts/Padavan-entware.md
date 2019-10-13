---
title: 在Padavan 上使用Entware
date: 2017-08-05 16:54:48
tags:
- entware
- onmp
categories: 教程
cover_img: https://pic.zhih.me/blog/posts/Padavan-entware/cover.jpg
description: 在安装ONMP前，你要学会安装Entware，这篇文章教你如何快速安装Entware，让你的Padavan固件具有更加丰富的功能，Entware是一个适用于嵌入式系统的软件包库，使用opkg包管理系统进行管理，现在在官方的源上已经有超过2000个软件包了，可以说是非常的丰富
keywords: Padavan, onmp, entware
---

## 前言

Entware 是一个适用于嵌入式系统的软件包库，使用 opkg 包管理系统进行管理，现在在官方的源上已经有超过 2000 个软件包了，可以说是非常的丰富

官方地址：[Entware](https://entware.net/)

## U盘、硬盘格式化（可选）

我们的设备本身的储存较少，而且如果哪天崩了，数据还有找不回的风险，所以我们一般把软件包和程序安装到 U 盘之类的外置设备上，所以需要对它进行格式化，以下教程全基于 ext4 分区格式，NTFS 格式我个人不推荐使用

格式化教程：[如何在路由器上格式化U盘、硬盘](https://zhih.me/format-Upan-partition)

## 安装 Entware

### 1. 新建 opt 文件夹

- 如果你是在电脑上格式化的 U 盘，并且知道怎么在电脑上读取 ext4 分区，那么在 ext4 分区的根目录新建一个 opt 文件夹

- 或者你可以把 U 盘插到路由器上，开启 samba 并通过电脑访问 samba，在 U 盘下创建 opt 文件夹

- 如果你上面的不会，并且按照我的教程在路由器上格式化 U 盘，还可以按照以下做法

```bash
ejusb
mkdir /media/onmp
mount -t ext4 /dev/sda1 /media/onmp
# /dev/sda1 是你的 ext4 分区

mkdir /media/onmp/opt
```

这样就创建好 opt 文件夹了，之后装的所有东西都会在里面

### 2. 开启 Entware

先卸载 U 盘

```bash
ejusb
```

然后在路由器管理页打开 Entware

![在 Padavan 上使用 entware ](https://pic.zhih.me/blog/posts/Padavan-entware/在Padavan上使用entware.jpg)

拔下 U 盘再重新插入，等一小会儿

### 3. 查看是否成功挂载 /opt

进入 shell，输入 `df -h`，看到 `/opt` 挂载了就对了

![查看是否成功挂载 /opt](https://pic.zhih.me/blog/posts/Padavan-entware/查看是否成功挂载.jpg)

如果 opt 没挂载，说明没安装上，请保证 opt 文件夹已经创建正确，确认无误，则可以进 shell 输入 `opkg.sh` 回车安装

如果使用固件自带脚本出现错误，可以尝试使用以下脚本

```bash
wget -O - http://bin.entware.net/mipselsf-k3.4/installer/generic.sh | /bin/sh
```

### 测试 opkg 命令

以上步骤之后，不出意外就装上了，我们现在可以测试一下

```bash
opkg update
```

## 其他

[在 LEDE 上使用 Entware](https://zhih.me/LEDE-entware/)

[在梅林上使用 Entware](https://zhih.me/Merlin-entware/)

ONMP 是一个 web 环境快速安装脚本，适用于安装了 [Entware](https://entware.net/) 的路由器，目前已经在 Padavan、LEDE（openwrt）、梅林上测试成功。

[ONMP 安装教程](https://zhih.me/onmp-installation/)

>本文章发表于底噪博客 https://zhih.me , 转载请注明
>直接偷的人，你打球真蔡

