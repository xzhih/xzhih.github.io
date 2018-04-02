---
title: 在梅林上使用Entware
date: 2017-08-03 02:43:56
tags: 
- 梅林
- entware
categories: 教程
cover_img:
feature_img:
---

Entware-ng是一个适用于嵌入式系统的软件包库，使用opkg包管理系统进行管理，现在在官方的源上已经有超过2000个软件包了，可以说是非常的丰富

官方地址：[Entware-ng](http://entware.net/about/)

## U盘、硬盘格式化（可选）

我们的设备本身的储存较少，而且如果哪天崩了，数据还有找不回的风险，所以我们一般把软件包和程序安装到U盘之类的外置设备上，所以需要对它格式化为ext4，NTFS格式不推荐使用

格式化教程：[如何在路由器上格式化U盘、硬盘](https://zhih.me/2018/format-Upan-partition)

## U盘挂载（可选）

梅林固件可以在插入磁盘的时候自动识别文件系统并挂载，所以说是相当方便了，一般我们都不需要执行这一步，不过有些固件可能还没有很完善，所以我给出以下一种挂载的方法，供参考。

分区、格式都没问题之后，开始挂载

```shell
$ mkdir /mnt/sda1
$ mount -t ext4 /dev/sda1 /mnt/sda1/
# 这样就挂载上了
$ df -h
Filesystem                Size      Used Available Use% Mounted on
/dev/sda1               975.5M      2.5M    906.6M   0% /tmp/mnt/sda1
# 可以看到已经挂载
```

## 安装和使用 Entware-ng

梅林内置了一个安装命令很方便

```
$ entware-setup.sh

# 然后会提示你选择哪个分区，就选择刚才挂载的那个
···省略
Info:  Looking for available partitions...
[1] --> /tmp/mnt/sda1
=>  Please enter partition number or 0 to exit
[0-1]: 1 # 选1回车
···省略
# 跑完之后只要不提示错误，就是安装成功了
```

经过以上步骤，已经可以从 `Entware-ng` 上进行下载安装包并安装到U盘上

这下可以享受丰富的软件包，还不占用内部储存空间

## PS 

[在Padavan上使用entware](https://zhih.me/2017/Padavan-entware/)

[在LEDE上使用Entware](https://zhih.me/2017/LEDE-entware/)

ONMP 是一个 web 环境快速安装脚本，适用于安装了 [Entware](http://entware.net/about/) 的路由器，目前已经在 Padavan、LEDE（openwrt）、梅林上测试成功。

[ONMP 安装教程: ](https://zhih.me/2017/onmp-installation/)
