---
title: Syncthing就是我要的同步备份软件
date: 2018-06-13 16:19:35
tags: macOS
categories: 教程
cover_img: https://pic.zhih.me/blog/posts/syncthing-the-best/cover.jpg
description: 多设备同步解决方案syncthing，极简可靠且易用的开源同步软件，数据无价，平时不注意备份，电脑突然翻车就追悔莫及啦，最开始的时候，我在路由器上开启Samba，又因为它们的网络不理想，就又放弃使用了
keywords: syncthing, 文件备份, NAS, macOS 备份, 文件同步
ld_json_img: https://pic.zhih.me/blog/posts/syncthing-the-best/end.jpg
---

## 引言

数据无价，平时不注意备份，电脑突然翻车就追悔莫及啦。

最开始的时候，我在路由器上开启 Samba，每次编辑完项目就手动拷贝到路由器硬盘里，麻烦程度可想而知，后来又用了 Google Drive/One Drive，又因为它们的网络不理想，就又放弃使用了。

其实就是很简单的需求，自动备份、速度快，然后去找了一下，发现一堆人推荐用 Rsync，这货我只在 VPS 上用过，拿来做镜像同步，但是要做实时同步，不好配置。

我就想，这需求应该有一大堆人有吧，就去 github 搜索 sync，发现 Syncthing 这么个好东西，截止 2018-06-13 已经得到 20k+ 的 star，并且更新很活跃

## 介绍

![logo](https://pic.zhih.me/blog/posts/syncthing-the-best/logo.jpg)

Syncthing 是一个文件连续同步软件

项目地址：https://github.com/syncthing/syncthing

它有以下特性：

- 跨平台
    - 使用 Golang 开发，几乎能在所有平台上使用，包括常见的安卓手机和路由器平台

- 易于使用
    - 只需要下载运行，打开浏览设置本地目录和远程主机，其他的不需要管
    
- 安全
    - 管理页可以设置密码，可以设置 https，设置备份需要两边都确认，使用唯一设备标识进行确认

## 安装

Syncthing 有多种安装方式

有一定 Linux 基础的人，可以使用下面的配置来设置启动服务

- https://github.com/syncthing/syncthing/tree/master/etc

Windows，Mac，Linux 和安卓手机可以在这里下载有 GUI 界面的程序使用

- https://docs.syncthing.net/users/contrib.html#gui-wrappers

其他方法可以自己决定，我是直接下载安装包命令行启动的

### 在 macOS 上安装

我用的是 macOS，可以直接使用 homebrew 安装启动，并且可以开机自动启动，你也可以到这里 [QSyncthingTray](https://github.com/sieren/QSyncthingTray/releases) 下载 macOS 的 GUI 版

```bash
brew install syncthing
```

启动服务（同时设置开机启动）

```bash
brew services start syncthing 
```

停止服务（同时关闭自启）

```bash
brew services stop syncthing 
```

手动启动（不会开机自启）

```bash
syncthing
```

启动进程后，可以用浏览器打开 `http://localhost:8384/` 来查看 web 管理页 

### 在 Windows 上安装

Windows 直接在这里 [SyncTrayzor](https://github.com/canton7/SyncTrayzor/releases) 下载软件运行

### 在 Linux VPS 上安装

大多数发行版和不同 CPU 平台的安装包，可以在这里 [Syncthing](https://github.com/syncthing/syncthing/releases) 找到，把它下载到你想要放在的目录然后设置权限，使用命令运行

文章开头有 GUI 版本的链接，不过我要装在没有 GUI 的 VPS 上，所以直接用命令行运行，系统用的是 Debian 9，然后用 supervisor 进程守护来启动的

碰巧前几天之前的一个客户，他的 VPS 做迁移，阿里云送了张代金券，然后客户就送给我了

![aff](https://pic.zhih.me/blog/posts/syncthing-the-best/aff.jpg)

然后续费 9 个月的阿里云学生机，美滋滋😎

虽然带宽比较低，但是对于这种连续同步的备份来说，在第一次备份之后，后面都是增量备份了，除非你都是备份大文件，要不对带宽的要求不是很高，另外 40G 的盘，完全够我备份用了，阿里云最主要就是稳定，很适合做我的备份机

#### 下载 Syncthing

下载最新的包，解压，移动到 `/bin/` 里，改权限

```bash
wget https://github.com/syncthing/syncthing/releases/download/v0.14.49-rc.1/syncthing-linux-amd64-v0.14.49-rc.1.tar.gz

tar xzvf ./syncthing-linux-amd64-v0.14.49-rc.1.tar.gz

mv ./syncthing-linux-amd64-v0.14.49-rc.1/syncthing /bin/

chmod +x /bin/syncthing
```

#### 进程守护

安装 supervisor

```bash
apt-get install supervisor
```

配置守护

```bash
vi /etc/supervisor/conf.d/syncthing.conf
```

填入以下内容

```
[program:syncthing]
command = /bin/syncthing -no-browser -home="/root/.config/syncthing"
directory = /root
autorestart = True
user = root
environment = STNORESTART="1", HOME="/root"
```

**注意**，我例子里使用的是 root 用户，所以响应的目录是 `/root`，你要是使用其他用户，应该是 `/home/用户名`，就是你登录时默认所在的目录

现在就可以使用 `supervisorctl` 命令来管理进程了

- 启动

```bash
supervisorctl start syncthing
```

- 重启

```bash
supervisorctl restart syncthing
```

- 停止

```bash
supervisorctl stop syncthing
```

启动进程后，可以用浏览器打开 `http://你的IP:8384/` 来查看 web 管理页 

如果无法打开页面，需要修改 `/.config/syncthing/config.xml` 里的 `127.0.0.1:8384` 字段为 `0.0.0.0:8384`，或者你可以和我一样使用 nginx 做反向代理，前提是你知道怎么做

### 在路由器上安装

目前 [Entware](https://entware.net/) 源里已经有这个包了，但是我发现它是个旧版本，并且有问题，所以这里我选择手动安装

这里的例子是 LEDE x64 但是也适合一切安装了 Entware 的路由器

在这里 [Syncthing](https://github.com/syncthing/syncthing/releases) 下载对应 CPU 平台的安装包，可以用 `uname -m` 查看，我这里是 x86_64 所以选择 amd64

#### 下载 syncthing

下载最新的包，解压，移动到 `/opt/bin/` 里，改权限

```bash
wget https://github.com/syncthing/syncthing/releases/download/v0.14.49-rc.1/syncthing-linux-amd64-v0.14.49-rc.1.tar.gz

tar xzvf ./syncthing-linux-amd64-v0.14.49-rc.1.tar.gz

mv ./syncthing-linux-amd64-v0.14.49-rc.1/syncthing /opt/bin/

chmod +x /opt/bin/syncthing
```

#### 添加启动命令

创建并编辑 `/opt/etc/init.d/S92syncthing`

```bash
vi /opt/etc/init.d/S92syncthing
```

在里面填上下面所有字段

```bash
#!/bin/sh
ENABLED=yes
PROCS=syncthing
ARGS="-home=/opt/etc/syncthing"
PREARGS=""
DESC=$PROCS
PATH=/opt/sbin:/opt/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

if [ ! -d /opt/etc/syncthing ]; then
   /opt/bin/syncthing -generate="/opt/etc/syncthing"
   sed -i 's|127.0.0.1:8384|0.0.0.0:8384|' /opt/etc/syncthing/config.xml
elif [[ -f /opt/etc/syncthing/config.xml -a "127.0.0.1:8384"=="127.0.0.1:8384" ]]; then
   sed -i 's|127.0.0.1:8384|0.0.0.0:8384|' /opt/etc/syncthing/config.xml
fi

. /opt/etc/init.d/rc.func

```

然后给权限

```bash
chmod +x /opt/etc/init.d/S92syncthing
```

用法: /opt/etc/init.d/S92syncthing (start|stop|restart|check)

启动服务就能在浏览器打开 `路由器IP:8384` 例如 `192.168.1.1:8384` 打开管理页了

## 使用方法

易于使用是 Syncthing 的一个重要特性，打开管理页，一目了然

首次打开管理页，所有平台上都是一样的

![syncthing](https://pic.zhih.me/blog/posts/syncthing-the-best/syncthing.jpg)

然后你需要做的就是

### 设置用户名、密码

![setpass](https://pic.zhih.me/blog/posts/syncthing-the-best/setpass.jpg)

### 设置文件夹

删除默认的同步文件夹，添加新同步文件夹

![addlocal](https://pic.zhih.me/blog/posts/syncthing-the-best/addlocal.jpg)

### 添加远程设备

![addremote](https://pic.zhih.me/blog/posts/syncthing-the-best/addremote.jpg)

然后稍微等一分钟，两边就能连接上了

最终效果

![end](https://pic.zhih.me/blog/posts/syncthing-the-best/end.jpg)

## 结语

Syncthing 作为一款跨平台同步软件，它简单易用、功能完善强大，具有很高的稳定性，很容易让人想出各种使用场景，而且它还是开源的，感谢那上百位贡献者

本文简单介绍了初级使用方法，还未提及其他的诸如版本控制等功能，其他功能应用，如果以后我觉得值得一说，再更新了

>本文章发表于底噪博客 https://zhih.me , 转载请注明
>直接偷的人，你打球真蔡
