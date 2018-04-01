---
title: ONMP 安装教程
date: 2017-08-02 22:05:54
tags: 
- onmp
- shell
categories: 教程
cover_img: https://i.loli.net/2018/03/18/5aad558e2b5f3.jpg
feature_img:
---

之前用过极路由1s，刷了恩山H大的固件，发现内置了 web 环境，没想到一个路由器都能跑的动 LNMP。我之前最极限的尝试就是在一个4刀3年的 sentris ovz 小鸡上跑过 WordPress ，那台小鸡 配置很低，只有 64M 的内存😂。不过 LNMP 流畅运行的因素挺多，PHP 吃 CPU、MySQL 吃 IO，不同的程序表现也不一样。那台极路由被我折腾了没两下就放弃了在上面搭网站，毕竟性能太低。

后来我上车了斐讯K2P，拿回来花了一个晚上改好了32+512+usb，刷的是灯大的硬改固件，少了H大固件的里面的丰富拓展，感觉都不对了，k2p既然硬改了，那就好好玩它，之前不是嫌弃极1s的性能不足嘛，现在K2P比起它来说，性能强了一些，运存大、CPU强、还是USB3.0，那就写个一键安装web环境吧，于是就有了这个项目。

## 简述

ONMP 是一个 web 环境快速安装脚本，适用于安装了 [Entware](http://entware.net/about/) 的路由器，目前已经在 Padavan、LEDE（openwrt）、梅林上测试成功。

和 LNMP 有什么不同？
LNMP 代表的是：Linux 系统下 Nginx/MySQL/PHP 这种网站服务器架构，而为了区分路由器环境的不同，使用的 ONMP 这个命名，本质还是 LNMP。

项目地址：[https://github.com/xzhih/ONMP](https://github.com/xzhih/ONMP)

QQ交流群：346477750

## 特性

此脚本不仅自动化安装 web 环境，还内置了一些好用的网站程序一键免配置快速安装。

```
ONMP内置了以下程序的一键安装：
(1) phpMyAdmin（数据库管理工具）
(2) WordPress（使用最广泛的CMS）
(3) Owncloud（经典的私有云）
(4) Nextcloud（Owncloud团队的新作，美观强大的个人云盘）
(5) h5ai（优秀的文件目录）
(6) Lychee（一个很好看，易于使用的Web相册）
(7) Kodexplorer（可道云aka芒果云在线文档管理器）
(8) Netdata（详细得惊人的服务器监控面板）
(9) Typecho (流畅的轻量级开源博客程序)
(10) Z-Blog (体积小，速度快的PHP博客程序)
```

## 安装教程

### 1. 安装 Entware

Entware-ng是一个适用于嵌入式系统的软件包库，使用opkg包管理系统进行管理，现在在官方的源上已经有超过2000个软件包了，可以说是非常的丰富

不同的固件，安装方式都不一样，请认准安装方式（自己是什么固件总该懂得吧😂）

*Padavan：*[在Padavan上使用entware](https://zhih.me/2017/Padavan-entware/)

*LEDE(openwrt)：*[https://zhih.me/2017/LEDE-entware](https://zhih.me/2017/LEDE-entware)

*梅林：*[https://zhih.me/2017/Merlin-entware](https://zhih.me/2017/Merlin-entware)

### 2. 安装onmp

一键命令，复制->粘贴->回车

```shell
 $ sh -c "$(curl -kfsSL https://raw.githubusercontent.com/xzhih/ONMP/master/oneclick.sh)"
```

一长串的复制如果出错，可以按照以下给出的命令，一步步进行安装

```shell
# 进入 entware 挂载目录
 $ cd /opt && opkg install wget unzip 

# 下载软件包
$ wget --no-check-certificate -O /opt/onmp.zip https://github.com/xzhih/ONMP/archive/master.zip 

# 解压
$ unzip /opt/onmp.zip

$ cd /opt/onmp

# 运行
$ chmod +x ./onmp.sh 
$ ./onmp.sh
```

要是正常运行到脚本，会出现下面的情景，选1安装即可

![安装](https://i.loli.net/2018/03/03/5a99ac096c6a1.png)

正常安装中要是出现错误，会有错误信息，根据提示操作，目前得到的大多数反馈都是网络问题，因为 entware 的源在国外，而且他们的管理者说之前受到了来自亚洲的DDOS，所以对这边限流了，速度较慢。遇到这种情况，可以去看看剧，没准回来的时候就好了😄

安装成功得到的结果是这样的

![安装成功](https://i.loli.net/2018/03/03/5a99aeda756ac.png)

如果你也是和上图一样，那么恭喜你，成功的安装上了 ONMP，你可以尽情的玩耍了

## ONMP 详细使用教程

**基本命令：**

```
管理：onmp open
启动、停止、重启：onmp start|stop|restart
查看网站列表：onmp list 
```

**设置数据库密码：**

输入 `onmp open` 后选择3，会提示 `Enter password:` ，这个时候要输入当前数据库的密码，比如我初始设置的数据库密码是123456，回车后要是密码正确，会提示输入你要设置的新密码，回车后会提示再次输入确认。也就是，一次旧密码，两次新密码。

这个位置很简单，但是很多人都说改不了密码，其实是没看提示，没输入旧密码，所以我写清楚一些。


