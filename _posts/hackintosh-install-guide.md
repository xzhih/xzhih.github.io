---
title: 黑苹果安装教程
date: 2018-03-31 19:42:54
tags: 
- hackintosh
- macOS
categories: 教程
cover_img: https://pic.zhih.me/blog/posts/hackintosh-install-guide/cover.jpg
description: 详细的黑苹果安装教程(视频加文字教程)，提供所有工具。黑果安装的教程大同小异，就是各个机型的配置不一样，从而导致EFI不一样，理论上讲，配置和燃7000相同或相近的机器都能按照这个教程安装好，其他机型也可以在使用我收集的EFI ...
keywords: hackintosh, macOS, 黑苹果, dell, 燃7000
ld_json_img: https://pic.zhih.me/blog/posts/hackintosh-install-guide/抹盘.jpg
---

## 引言

在燃7000 的群里发现还有很多小伙伴进群，挺震惊的，毕竟这本子这么久了还能保持一定的热度，但是群里的教程比较老旧，很多内容已经不适合现在的新系统，于是就有了这个教程。

黑果安装的教程大同小异，就是各个机型的配置不一样，从而导致EFI不一样，理论上讲，配置和燃7000相同或相近的机器都能按照这个教程安装好。

>其他机型的小伙伴可以到我的黑苹果合集里找找，可能会有合适你的 EFI 
>https://zhih.me/hackintosh/

## 视频版

B站：https://www.bilibili.com/video/av21503652

YouTube：https://youtu.be/IZCF3E_oQB8

## 1. 准备

至少 8G 容量的U盘

分区精灵 http://www.diskgenius.cn

黑果小兵的 [macOS 镜像](https://zhih.me/hackintosh/#/OS-images)

镜像写入工具：[Etcher](https://www.balena.io/etcher/)

~~transmac 链接: https://pan.baidu.com/s/15QmZZLtRU1ZwMi7uCYKC-g 密码: 8dpe~~

## 2. 分配硬盘ESP分区

硬盘分区表类型必须为 GUID，ESP 分区必须大于 200M，我建议给个 220M

![ESP分区](https://pic.zhih.me/blog/posts/hackintosh-install-guide/ESP分区.jpg)

分出你想要装 macOS 的分区，大小你自己定，格式随便，因为安装时要抹盘

## 3. 写入镜像

写入镜像现在可以使用更好的工具 [Etcher](https://www.balena.io/etcher/)，当然 transmac 也是可以用的

### 第一种方法 Etcher

1. 安装后打开 Etcher
2. 选择镜像
3. 选择 U 盘
4. 等待写入完成

**这样就可以了**，是不是很简单

### 第二种方法 transmac 

**格式化**

以管理员身份运行 transmac，<kbd>右键</kbd>点击你的U盘，选择 `Format Disk for Mac`，全选择确认然后等它格式化完，win10 可能会提示要想使用U盘必须对其格式化，点取消。

![格式化](https://pic.zhih.me/blog/posts/hackintosh-install-guide/格式化.jpg)

**写入**

再次<kbd>右键</kbd>点击 U 盘，选择 `Restore with Disk Image`，选择镜像点击 OK，静静等待写入完成

![写入镜像](https://pic.zhih.me/blog/posts/hackintosh-install-guide/写入镜像.jpg)

写入完成，win 可能还会提示一些格式化之类的，不用理会

## 4. 其他设置

### BIOS 设置

重启进入 BIOS，设置硬盘 AHCI、关闭安全启动，保存退出

![BIOS设置](https://pic.zhih.me/blog/posts/hackintosh-install-guide/BIOS设置1.jpg)

![BIOS设置](https://pic.zhih.me/blog/posts/hackintosh-install-guide/BIOS设置2.jpg)

### U盘启动

再次重启，进入启动项选择（ dell 是在显示 logo 时按 <kbd>F12</kbd>）

选择你的U盘

![U盘启动](https://pic.zhih.me/blog/posts/hackintosh-install-guide/U盘启动1.jpg)

如果你的没显示，可以在 BIOS 里添加

![U盘启动](https://pic.zhih.me/blog/posts/hackintosh-install-guide/U盘启动2.jpg)

## 5. 安装

在 clover 设置里选择 config 为 `config_HD615_620_630_640_650.plist`

![clover启动设置](https://pic.zhih.me/blog/posts/hackintosh-install-guide/clover启动设置.jpg)

返回选择 macOS 安装引导项

### 抹盘

以上不出意外，就能看到 macOS 的恢复模式了

进入磁盘工具

选择你要安装到的分区，点击抹掉，选择格式为 `macOS扩展（日志式）`，抹掉

![抹盘](https://pic.zhih.me/blog/posts/hackintosh-install-guide/抹盘.jpg)

抹盘出现错误的，一般是分区所在硬盘的 ESP 分区不足 200M 导致的

### 安装 macOS

退出磁盘工具，选择安装 macOS

之后就能正常安装了，具体的我就不上图了，想看过程就去看视频版的吧

安装会有 3 个阶段

- 第一阶段，程序把文件写入硬盘，然后会自动重启，选择U盘引导进入 clover，再次设置 config，退出选择新出现的引导项

- 第二阶段，程序继续进行系统安装，完成后会自动重启，同样需要选择U盘引导和 config 设置

- 第三阶段，系统安装完成，进行一些自定义设置，进入系统

## 6. 更换EFI，实现硬盘引导和其他驱动

安装好系统后，一些硬件是没有驱动的，这是就需要用替换 EFI 了，而且之前的 EFI 是镜像自带的，并且在U盘里，现在我们要用硬盘引导

### 工具

下载 [Clover Configurator](https://mackie100projects.altervista.org/download-clover-configurator/)

![Clover Configurator](https://pic.zhih.me/blog/posts/hackintosh-install-guide/下载CloverConfigurator.jpg)

下载 [冰水的EFI](https://zhih.me/dell-7460-7560-hackintosh)

![冰水的EFI](https://pic.zhih.me/blog/posts/hackintosh-install-guide/冰水的EFI.jpg)

### 替换

打开 Clover Configurator，点击 `Mount EFI` ，挂载安装磁盘上 ESP 分区

打开分区，把你的机型所对应的 EFI 文件夹扔到分区里

![替换](https://pic.zhih.me/blog/posts/hackintosh-install-guide/替换.jpg)

可以拔掉U盘重启了

## 7. 后续

启动默认进 win 的，可以在 BIOS 里设置 clover 启动项为第一位

亮度无法调节的，可以使用 kext utility 重建缓存，重启生效

字体太小？可以使用我的 HIDPI 脚本开启缩放

>本文章发表于底噪博客 https://zhih.me , 转载请注明
