---
title: macOS读写NTFS，及EXT分区格式化和挂载
date: 2018-06-01 06:09:18
tags: macOS
categories: 教程
cover_img: https://pic.zhih.me/blog/posts/macos-mount-ntfs-ext/cover.jpg 
description: 有时候需要在macOS读写NTFS分区，但是系统默认只能读取不能写入，我这里使用的是osxfuse，因为它不仅能支持NTFS，还支持Ext等其他文件系统，在macOS上挂载NTFS和Ext分区，在macOS上格式化Exts分区
keywords: macOS 读写 NTFS，macOS 挂载 NTFS, macOS 挂载 Ext, macOS 格式化 Ext, osxfuse, ntfs-3g
ld_json_img: https://pic.zhih.me/blog/posts/macos-mount-ntfs-ext/panes.jpg
---

## 引言

有时候需要在 macOS 读写 NTFS 分区，但是系统默认只能读取不能写入，修改 fstab 和使用 Paragon NTFS 软件都可以实现读写，而我这里使用的是 osxfuse，因为它不仅能支持 NTFS, 还支持 Ext 等其他文件系统

![panes](https://pic.zhih.me/blog/posts/macos-mount-ntfs-ext/panes.jpg)

以下操作需要关闭 SIP，进入恢复模式，在终端里输入 `csrutil disable`，再重启就关闭 SIP 了，黑苹果可以在 clover 里设置

## 安装 osxfuse

`FUSE for OS X` 是用在 macOS 上的第三方文件系统扩展，地址：https://github.com/osxfuse/osxfuse/wiki

使用 [homebrew](https://brew.sh/) 安装

```bash
brew cask install osxfuse
```

![osxfuse.jpg](https://pic.zhih.me/blog/posts/macos-mount-ntfs-ext/osxfuse.jpg)

事实上 FUSE 是提供了提供了接口，要实现 NTFS 和 Ext 文件系统的支持，还需要安装模块

## 读写 NTFS 分区

让 macOS 读写 NTFS 需要安装 ntfs-3g

```bash
brew install ntfs-3g
```

### 手动挂载

使用 `diskutil list` 查看分区，例如我的 U 盘是 `disk4s1`

那么可以用以下命令挂载

```bash
mkdir ~/Desktop/UDISK
sudo ntfs-3g /dev/disk4s1 ~/Desktop/UDISK -o allow_other
```

这样 U 盘就被挂载到桌面了

卸载这个分区的命令式是 `sudo umount /dev/disk4s1`

**注意：**不管是用什么方式挂载 NTFS 分区，都不建议挂载 win 的系统盘，有翻车嫌疑，所以当 ntfs-3g 发现你挂载的分区有 win 休眠和快速启动遗留的缓存时，会以只读模式挂载，如果实在需要修改 win 系统分区，需要在 win 里关闭快速启动 

### 自动挂载

我们知道，macOS 开机时会自动挂载 NTFS 分区，但是只能读取

安装 ntfs-3g 后，我们需要让新的 mount_ntfs 替换系统自带的版本，实现写入

为了减少对系统的影响，我们把旧版本备份，并把新版本软链接过去

```bash
sudo mv /sbin/mount_ntfs /sbin/mount_ntfs.bak
sudo ln -s /usr/local/sbin/mount_ntfs /sbin/mount_ntfs
```

重启生效，需要注意的是，每次升级或重装系统之后，需要重新做软链接

现在可以重新打开 SIP，在恢复模式的终端里，输入 `csrutil enable` 再重启，黑果可以在 clover 里设置

## EXT 格式化和挂载

ext2、ext3、ext4 格式化需要安装 e2fsprogs，挂载需要安装 [fuse-ext2](https://github.com/alperakcan/fuse-ext2)

fuse-ext2 也依赖于 e2fsprogs，所以先装它

```bash
brew install e2fsprogs
```

再安装 fuse-ext2

```bash
brew install https://raw.githubusercontent.com/yalp/homebrew-core/fuse-ext2/Formula/fuse-ext2.rb
```

根据提示，设置面板里的选项需要这样操作才能显示

```bash
sudo cp -pR /usr/local/opt/fuse-ext2/System/Library/Filesystems/fuse-ext2.fs /Library/Filesystems/

sudo chown -R root:wheel /Library/Filesystems/fuse-ext2.fs

sudo cp -pR /usr/local/opt/fuse-ext2/System/Library/PreferencePanes/fuse-ext2.prefPane /Library/PreferencePanes/

sudo chown -R root:wheel /Library/PreferencePanes/fuse-ext2.prefPane
```

![ext](https://pic.zhih.me/blog/posts/macos-mount-ntfs-ext/ext.jpg)

这样就装好了

### EXT 分区格式化

前面我们已经安装了 e2fsprogs，现在可以使用它提供的命令来格式化分区

先设置变量让 e2fs 库里的命令暴露出来，将以下字段加在 shell 的配置文件中，我用的是 zsh，所以加在 `~/.zshrc` 里

```
export PATH="/usr/local/opt/e2fsprogs/bin:$PATH"
export PATH="/usr/local/opt/e2fsprogs/sbin:$PATH"
```

重启终端或执行 `source ~/.zshrc` 生效

现在就能执行 `mkfs.ext2` `mkfs.ext3` `mkfs.ext4` 等命令了

用法：

```bash
mkfs.ext4 [-c|-l 文件名] [-b 块大小] [-C 簇大小]
    [-i 每inode的字节数] [-I inode大小] [-J 日志选项]
    [-G 弹性组大小] [-N inode数] [-d 根目录]
    [-m 保留块所占百分比] [-o 创始系统名]
    [-g 每组的块数] [-L 卷标] [-M 上一次挂载点]
    [-O 特性[,...]] [-r 文件系统版本] [-E 扩展选项[,...]]
    [-t 文件系统类型] [-T 用法类型] [-U UUID] [-e 错误行为][-z 撤销文件]
    [-jnqvDFKSV] 设备 [块数]
```

使用 `diskutil list` 查看分区，例如我想要格式化为 ext4 的分区是 `disk3s1`

```bash
sudo mkfs.ext4 /dev/disk3s1
```

### 挂载 EXT 分区

使用 `diskutil list` 查看分区，例如我有个 Ext4 分区是 `disk3s1`

那么命令是这样的

```bash
mkdir ~/Desktop/DISK
sudo mount -t fuse-ext2 /dev/disk3s1 ~/Desktop/DISK
```

这样就挂载上了

卸载这个分区的命令式是 `sudo umount /dev/disk3s1`

## 结语

平常这些挂载工具用的确实不是很多，但是需要用的时候，又很无奈，所以直接写个笔记记录一下，以后要用的时候方便些

>本文章发表于底噪博客 https://zhih.me , 转载请注明
>直接偷的人，你打球真蔡
