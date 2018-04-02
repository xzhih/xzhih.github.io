---
title: 在Padavan上使用entware
date: 2017-08-05 16:54:48
tags: entware
categories: 教程
cover_img: https://i.loli.net/2018/03/03/5a9a701874b88.png
feature_img:
---

Entware-ng是一个适用于嵌入式系统的软件包库，使用opkg包管理系统进行管理，现在在官方的源上已经有超过2000个软件包了，可以说是非常的丰富

官方地址：[Entware-ng](http://entware.net/about/)

## U盘、硬盘格式化（可选）

我们的设备本身的储存较少，而且如果哪天崩了，数据还有找不回的风险，所以我们一般把软件包和程序安装到U盘之类的外置设备上，所以需要对它进行格式化，NTFS格式我个人不推荐使用

格式化教程：[如何在路由器上格式化U盘、硬盘](https://zhih.me/2018/format-Upan-partition)

## U盘挂载

**1. 在U盘（建议先格式化为ext4格式）根目录新建一个opt文件夹，插到路由器**

Padavan 固件可以在插入磁盘的时候自动识别文件系统并挂载，所以说是相当方便了

**2. 开启 Entware**

![在Padavan上使用entware](https://i.loli.net/2018/03/03/5a9a65bcb6aac.png)

**3. 重启路由器，开机的时候会自动安装 opt** 

**4. 查看是否成功挂载 /opt**

进入shell，输入df -h，看到/opt挂载了就对了

![查看是否成功挂载 /opt](https://i.loli.net/2018/03/03/5a9a671c89238.png)

如果opt没挂载，说明没安装上，则可以进shell输入 `opkg.sh` 回车

## PS 

[在LEDE上使用Entware](https://zhih.me/2017/LEDE-entware/)

[在梅林上使用Entware](https://zhih.me/2017/Merlin-entware/)

ONMP 是一个 web 环境快速安装脚本，适用于安装了 [Entware](http://entware.net/about/) 的路由器，目前已经在 Padavan、LEDE（openwrt）、梅林上测试成功。

[ONMP 安装教程: ](https://zhih.me/2017/onmp-installation/)
