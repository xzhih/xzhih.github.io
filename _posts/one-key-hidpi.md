---
title: 一键开启MacOS HiDPI
date: 2018-04-03 05:01:09
tags: 
- shell
- MacOS
categories: 教程
cover_img: https://pic.zhih.me/blog/posts/one-key-hidpi/cover.jpg
description: 为中低分辨率的屏幕开启HiDPI选项，并且具有原生的HiDPI设置，不需要RDM软件即可在系统显示器设置中设置，作为一个黑苹果用户，从第一视觉上最重要的就是屏幕了，当然自带的屏幕素质没法改变，除非换屏了，然而换屏又违背了省钱的初衷，于是只能通过UI上的改变来提升体验了
keywords: MacOS, shell, HiDPI, 黑苹果
ld_json_img: https://pic.zhih.me/blog/posts/one-key-hidpi/hidpi-setting.jpg
---

## 引言

作为一个黑苹果用户，追求黑果的体验是当然的，当各个硬件都驱动完善后，要做的就是细节的优化了，毕竟装上是拿来用的，可不能因为体验差苦了自己啊😂。机器毕竟便宜，从第一视觉上最重要的就是屏幕了，当然自带的屏幕素质没法改变，除非换屏了，然而换屏又违背了省钱的初衷，于是只能通过 UI 上的改变来提升体验了。

## 说明

项目地址：https://github.com/xzhih/one-key-hidpi

 此脚本的目的是为中低分辨率的屏幕开启 HiDPI 选项，并且具有原生的 HiDPI 设置，不需要 RDM 软件即可在系统显示器设置中设置

MacOS 的 dpi 机制和 win 下不一样，比如 1080p 的屏幕在 win 下有 125%、150% 这样的缩放选项，而同样的屏幕在 MacOS 下，缩放选项里只是单纯的调节分辨率，这就使得在默认分辨率下字体和 UI 看起来很小，降低分辨率又显得模糊。

同时，此脚本也可以通过注入修补后的 EDID 修复闪屏，或者睡眠唤醒后的闪屏问题，当然这个修复因人而异

开机的第二阶段 logo 总是会稍微放大，因为分辨率是仿冒的

设置：

![HiDPI效果.png](https://pic.zhih.me/blog/posts/one-key-hidpi/hidpi-setting.jpg)

## 使用方法

在终端输入以下命令回车即可

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/xzhih/one-key-hidpi/master/hidpi-zh.sh)"
```

![运行](https://pic.zhih.me/blog/posts/one-key-hidpi/run.jpg)

## 恢复

如果使用此脚本后，开机无法进入系统，请到恢复模式中或使用 clover 的 `-x` 安全模式进入系统 ，使用终端删除 /System/Library/Displays/Contents/Resources/Overrides 下删除显示器 VendorID 对应的文件夹，并把 backup 文件夹中的备份复制出来。

具体命令如下：

```bash
cd /Volumes/你的系统盘/System/Library/Displays/Contents/Resources/Overrides
VendorID=$(ioreg -l | grep "DisplayVendorID" | awk '{print $8}')
Vid=$(echo "obase=16;$VendorID" | bc | tr 'A-Z' 'a-z')
rm -rf ./DisplayVendorID-$Vid
cp -r ./backup/* ./
```

>本文章发表于底噪博客 https://zhih.me , 转载请注明

