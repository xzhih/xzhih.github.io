---
title: 在 Padavan 上使用 entware
date: 2017-08-05 16:54:48
tags:
- entware
- onmp
categories: 教程
cover_img: https://pic.zhih.me/blog/posts/Padavan-entware/cover.jpg
description: 在安装 ONMP 前，你要学会安装 Entware
keywords: Padavan, onmp, entware
---

Entware-ng 是一个适用于嵌入式系统的软件包库，使用 opkg 包管理系统进行管理，现在在官方的源上已经有超过 2000 个软件包了，可以说是非常的丰富

官方地址：[Entware-ng](http://entware.net/)

## U盘、硬盘格式化（可选）

我们的设备本身的储存较少，而且如果哪天崩了，数据还有找不回的风险，所以我们一般把软件包和程序安装到 U盘之类的外置设备上，所以需要对它进行格式化，NTFS 格式我个人不推荐使用

格式化教程：[如何在路由器上格式化U盘、硬盘](https://zhih.me/format-Upan-partition)

## U盘挂载

### 1. 新建 opt 文件夹

在U盘（建议先格式化为 ext4 格式）根目录新建一个 opt 文件夹，插到路由器；或者在路由器上格式化并拔插U盘，命令行新建 opt 文件夹

Padavan 固件可以在插入磁盘的时候自动识别文件系统并挂载，所以说是相当方便了

### 2. 开启 Entware

![在Padavan上使用entware](https://pic.zhih.me/blog/posts/Padavan-entware/在Padavan上使用entware.jpg)

### 3. 重启路由器

开机的时候会自动安装 opt

### 4. 查看是否成功挂载 /opt

进入 shell，输入 `df -h`，看到 `/opt` 挂载了就对了

![查看是否成功挂载 /opt](https://pic.zhih.me/blog/posts/Padavan-entware/查看是否成功挂载.jpg)

如果 opt 没挂载，说明没安装上，则可以进 shell 输入 `opkg.sh` 回车

如果使用固件自带脚本出现错误，可以尝试使用以下脚本

```
$ wget -O - http://bin.entware.net/mipselsf-k3.4/installer/generic.sh | /bin/sh
```

## 其他

[在 LEDE 上使用 Entware](https://zhih.me/LEDE-entware/)

[在梅林上使用 Entware](https://zhih.me/Merlin-entware/)

ONMP 是一个 web 环境快速安装脚本，适用于安装了 [Entware](http://entware.net/about/) 的路由器，目前已经在 Padavan、LEDE（openwrt）、梅林上测试成功。

[ONMP 安装教程: ](https://zhih.me/onmp-installation/)
