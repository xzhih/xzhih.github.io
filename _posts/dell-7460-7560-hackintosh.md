---
title: 戴尔燃7000黑苹果EFI
date: 2017-12-03 19:42:54
tags: 
- hackintosh
- macOS
categories: 教程
cover_img: https://pic.zhih.me/blog/posts/dell-7460-7560-hackintosh/cover.jpg
description: 适用于戴尔燃7000系列第一第二代型号为7460/7560/7472/7572的笔记本电脑，EFI可直接用于安装和日常使用，经过一年多的持续更新，已经趋于完美，当做主力系统一点问题都没有 ...
keywords: hackintosh, macOS, 黑苹果, dell, 燃7000
ld_json_img: https://pic.zhih.me/blog/posts/one-key-hidpi/hidpi-setting.jpg
---

## 引言

简单说下我的电脑配置：

| 配置 | 详情 |
| --- | --- |
| CPU | Intel Core i5-7200U |
| 显卡 | Intel HD Graphics 620 / Nvidia GeForce 940MX |
| RAM | 4G + 8G DDR4 2400MHz |
| 硬盘 | SATA3 500g SSD / M.2 SATA3 128g SSD |
| 声卡 | Realtek Audio ALC 3246 (ALC256) |
| 网卡 | BCM94360cs2、DW1830、DW1560 (三张卡我都有) |

在买这台电脑之前就听说过 hackintosh，也就是黑苹果。但是都没有尝试过，因为一般的笔记本黑起来麻烦多多，很难做到“可用”状态，而这台电脑不仅有两个内存插槽、一个 M.2 接口（不支持 nvme）、一个 SATA3 接口，还有一个可更换的网卡，很适合用来黑。

经过一年多的持续更新，已经趋于完美，当做主力系统一点问题都没有。

这是我在经过大量尝试和更新后得出的适用于燃7000的EFI，其他机型，配置相同或者大致相同的同学可以尝试使用。

>其他机型的小伙伴可以到我的黑苹果合集里找找，可能会有合适你的 EFI
>https://zhih.me/hackintosh/

## 说明

此合集适用于戴尔燃 7000 系列第一第二代型号为 7460/7560/7472/7572 的笔记本电脑
EFI 可直接用于安装和日常使用

项目地址：[https://github.com/xzhih/dell-7460-7560-hackintosh](https://github.com/xzhih/dell-7460-7560-hackintosh)

SSDT hotpatch 来自[RehabMan](https://github.com/RehabMan/OS-X-Clover-Laptop-Config) 

文件列表：

1. EFI (必须)
2. [HIDPI 已转移到单独的仓库](https://github.com/xzhih/one-key-hidpi) (可选)
3. 网卡驱动 (可选)
4. 黑果小兵的 ALCPlugFix (详细说明[来源传送门](https://github.com/daliansky/ALCPlugFix/blob/master/README.md))

## 使用方法

### 1. EFI

安装时（不保证能顺利安装）：使用 transmac 写入镜像至 U 盘后，拷贝 EFI 到 U 盘 ESP 分区中，重启按 <kbd>F12</kbd> 选择 U 盘启动即可开始安装

具体安装教程请看[我的教程](https://zhih.me/hackintosh-install-guide/)

日常使用：安装好系统后，使用 `clover configurator` 挂载 macOS 所在硬盘的 ESP 分区，把 EFI 拷贝进去，重启按 <kbd>F2</kbd> 进入 BIOS 设置此引导为首选，保存重启即可

### 2. 声卡、耳机

声卡驱动都已经有了，只需要进入 `黑果小兵的ALCPlugFix` 这个文件夹，双击 `install...` 运行即可，可以解决唤醒无声、耳机无声、耳机杂音等问题

### 3. 一键开启HIDPI并注入EDID

此一键命令可开启接近原生的 HIDPI 设置，不需要RDM软件即可在系统显示器设置中设置

仓库地址：[一键开启 HIDPI](https://github.com/xzhih/one-key-hidpi)

效果：

![设置.png](https://pic.zhih.me/blog/posts/one-key-hidpi/hidpi-setting.jpg)

### 4. 网卡驱动

机器自带的无线网卡无法驱动，只能购买可驱动的网卡更换，推荐购买 `dw1560/dw1830` 这两款网卡，需要注意的是燃系列有个超燃版也就是没有独显的版本，它因为主板结构不同不能安装 dw1830，另外 dw1830 是 3 天线网卡，在购买时可向商家索要一根 `7~15cm` 的天线，安装时将第三根天线放置在 HDD 下的开槽处防止金属屏蔽信号

文件夹内有两个网卡的驱动，自行将里面的驱动拷贝到 `EFI/clover/kext/other` 中

### 5. 触摸板手势

触摸板已支持原生手势，自行在系统偏好设置->触控板里打开

## 其他说明

macOS10.14 中会存在模糊过渡不自然的问题，只需要把 clover 里的 `config-Spoof.plist` 重命名为 `config.plist` 即可解决，原来的`config.plist` 换个你喜欢的名字

每次系统升级或替换新的EFI后，都要打开 `Kext Utility.app` 自动重建缓存，最好还在终端用 `sudo nvram -c` 命令清空一次NVRAM

>本文章发表于底噪博客 https://zhih.me , 转载请注明
>直接偷的人，你打球真蔡
