---
title: 黑苹果安装教程
date: 2018-03-31 19:42:54
tags: hackintosh
categories: 教程
cover_img: https://i.loli.net/2018/04/01/5ac0f0a0d425d.jpg
feature_img:
---

在燃7000的群里发现还有很多小伙伴进群，挺震惊的，毕竟这本子这么久了还能保持一定的热度，但是群里的教程比较老旧，很多内容已经不适合现在的新系统，于是就有了这个教程。

黑果安装的教程大同小异，就是各个机型的配置不一样，从而导致EFI不一样，理论上讲，配置和燃7000相同或相近的机器都能按照这个教程安装好。

# 视频版

B站：https://www.bilibili.com/video/av21503652/

YouTube：https://youtu.be/IZCF3E_oQB8

# 图文版

## 1. 准备

1个至少8G容量的U盘

分区精灵 [http://www.diskgenius.cn](http://www.diskgenius.cn)

黑果小兵的MacOS镜像 [https://blog.daliansky.net](https://blog.daliansky.net/macOS-High-Sierra-10.13.4-17E199-Release-Version-and-Clover-4418-Original-Image.html)

transmac 链接: https://pan.baidu.com/s/15QmZZLtRU1ZwMi7uCYKC-g 密码: 8dpe

## 2. 分配硬盘ESP分区

硬盘分区表类型必须为 GUID，ESP 分区必须大于200M，我建议给个220M

![ESP分区](https://i.loli.net/2018/03/31/5abf6e9f2ecd6.png)

分出你想要装 MacOS 的分区，大小你自己定，格式随便，因为安装时要抹盘

## 3. 写入镜像

### 格式化

以管理员身份运行 transmac，右键点击你的U盘，选择 `Format Disk for Mac`，全选择确认然后等它格式化完，win10可能会提示要想使用U盘必须对其格式化，点取消。

![格式化](https://i.loli.net/2018/03/31/5abf6f80b9205.png)

### 写入

再次右键点击U盘，选择 `Restore with Disk Image`，选择镜像点击OK，静静等待写入完成

![写入镜像](https://i.loli.net/2018/03/31/5abf6f80c251c.png)

写入完成，win可能还会提示一些格式化之类的，不用理会

## 4. 其他设置

### BIOS设置

重启进入BIOS，设置硬盘AHCI、关闭安全启动，保存退出

![BIOS设置](https://i.loli.net/2018/03/31/5abf6331b1234.jpg)

![BIOS设置](https://i.loli.net/2018/03/31/5abf6331a9d57.jpg)

### U盘启动

再次重启，进入启动项选择（dell是在显示logo时按F12）

选择你的U盘

![U盘启动](https://i.loli.net/2018/03/31/5abf6a0327dab.jpg)

如果你的没显示，可以在BIOS里添加

![U盘启动](https://i.loli.net/2018/03/31/5abf653d1389d.jpg)

## 5. 安装

在 clover 设置里选择 config 为 `config_HD615_620_630_640_650.plist`

![clover](https://i.loli.net/2018/03/31/5abf6aee27f9b.jpg)

返回选择 MacOS 安装引导项

### 抹盘

以上不出意外，就能看到MacOS的恢复模式了

进入磁盘工具

选择你要安装到的分区，点击抹掉，选择格式为 `MacOS扩展（日志式）`，抹掉

![抹盘](https://i.loli.net/2018/03/31/5abf6e18e7ec2.jpg)

抹盘出现错误的，一般是分区所在硬盘的ESP分区不足200M导致的

### 安装 MacOS

退出磁盘工具，选择安装 macOS

之后就能正常安装了，具体的我就不上图了，想看过程就去看视频版的吧

安装会有3个阶段

- 第一阶段，程序把文件写入硬盘，然后会自动重启，选择U盘引导进入clover，再次设置config，退出选择新出现的引导项

- 第二阶段，程序继续进行系统安装，完成后会自动重启，同样需要选择U盘引导和config设置

- 第三阶段，系统安装完成，进行一些自定义设置，进入系统

## 6. 更换EFI，实现硬盘引导和其他驱动

安装好系统后，一些硬件是没有驱动的，这是就需要用替换EFI了，而且之前的EFI是镜像自带的，并且在U盘里，现在我们要用硬盘引导

### 工具

下载 [Clover Configurator](https://mackie100projects.altervista.org/download/ccv/)

![Clover Configurator](https://i.loli.net/2018/03/31/5abf7697197ef.png)

下载 [冰水的EFI](https://zhih.me/2017/dell-7460-7560-hackintosh)

![冰水的EFI](https://i.loli.net/2018/03/31/5abf76969efac.png)

### 替换

打开 Clover Configurator，点击 `Mount EFI` ，挂载安装磁盘上ESP分区

打开分区，把你的机型所对应的EFI文件夹扔到分区里

![替换](https://i.loli.net/2018/03/31/5abf7693a2c24.png)

可以拔掉U盘重启了

## 7. 后续

启动默认进win的，可以在BIOS里设置clover启动项为第一位

亮度无法调节的，可以使用 kext utility 重建缓存，重启生效

字体太小？可以使用我的 HIDPI 脚本开启缩放


