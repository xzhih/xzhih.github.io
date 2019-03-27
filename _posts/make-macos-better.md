---
title: macOS这样更好用
date: 2018-04-04 02:35:34
tags: macOS
categories: 心得
cover_img: https://pic.zhih.me/blog/posts/make-macos-better/cover.jpg
description: 工欲善其事，必先利其器，教你如何配置macOS，让它更好用，我之所以选择使用macOS，是因为它是简洁高效的类Unix系统，对各种开发环境友好，并且近年来随着国内Mac的普及 ...
keywords: macOS, Xcode, Homebrew, Oh My Zsh, GitHub
---

## 引言

我之所以选择使用 macOS，是因为它是简洁高效的类 Unix 系统，对各种开发环境友好，并且近年来随着国内 Mac 的普及，各种应用软件也在 macOS 上适配了，软件丰富度方面完全不用担心，并且 macOS 下的软件更加的纯净简洁，不会像 Windows 下那样出现 “全家桶” 效应。

俗话说得好：工欲善其事，必先利其器

那么，刚装上一个新的系统，应该怎样去设置，让它更好用呢？

## 0. 软件

我收集了一些免费的 macOS APP，可以去看看，如果你有推荐的，也可以回复我

https://zhih.me/hackintosh/#/freeapp

## 1. 系统设置

### dock栏（程序坞）

系统默认的 dock 栏是在底部的，在打开应用时会减少信息流可视面积，所以我们可以设置

- 把它放到屏幕左边
- 调小图标
- 设置鼠标放在图标上时变大

这样就可以省出更多的空间，并且按照从左到右的阅读习惯，放在右边比较合适。

![程序坞](https://pic.zhih.me/blog/posts/make-macos-better/程序坞.jpg)

### finder（访达）

finder 作为一个文件资源管理中心，一些小设置可以让你用的得心应手

- 文件夹
    - 在用户目录里新建 `home`、`code` 目录
- 工具栏
    - 去掉 `排列`，因为可以在文件夹里右键设置排列
    - 添加 `删除`、`新建文件夹`
- 显示
    - 显示路径栏
    - 显示状态栏
- 侧边栏
    - 添加 `home` 目录
    - 添加 `code` 目录

![访达.png](https://pic.zhih.me/blog/posts/make-macos-better/访达.jpg)

## 2. Xcode

Xcode 是 macOS 下重要的 IDE，你要是开发苹果系的原生 App，需要它，而我们更多是需要他的命令行工具

首先，在[App Store](https://itunes.apple.com/cn/app/xcode/id497799835?mt=12)安装Xcode。

Xcode 提供了编译软件必备的 `Xcode Command Line Tools`，它包含了 GCC 编译器，在装完 Xcode 之后我们需要执行一下命令安装它

```bash
xcode-select --install
```

他会提示安装，按照说明操作就可以了。

## 3. Homebrew

用过 Linux 的都知道包管理器，Debian 系用的 dpkg、红帽系用的 rpm，而 macOS 下最受追捧的就是 [Homebrew](https://brew.sh/) 了，它可以让我们安装和更新应用程序或库，是个大杀器。

### 安装

安装 Homebrew 需要前面提到的 `Xcode Command Line Tools`，之后 Homebrew 所执行的编译包的任务全都依靠它。

在终端输入命令以下回车就能进行安装了

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

在安装完成后执行以下命令，诊断一下有没有什么错误，或者 Homebrew 需要你做什么样的设置

```bash
brew doctor
```

brew 就是 Homebrew 的包管理命令了，用法类似 debian 的 apt-get

### 换源

Homebrew 默认的源服务器在国外，这样我们在国内使用的时候速度可能比较慢，阿里云提供了镜像源，我们可以在阿里开源镜像站找到

https://opsx.alibaba.com/mirror

找到 homebrew，点击后面的**帮助**可以查看安装和卸载教程

>如果你在使用 homebrew 的时候无法下载程序包，可以尝试换源，一般情况下或者有代理的环境下不建议换源 

### 用法

homebrew 的用法和其它包管理器一样，如果你使用过，那么这步你可以不看

```bash
# 安装软件包
brew insatll 包名

# 搜索
brew search 包名

# 卸载
brew uninstall 包名

# 查看已安装列表
brew list

# 获取新列表
brew update

# 升级软件包
brew upgrade
```

## 4. 快速查看

QuickLook 是 macOS 中相当高效的功能，按一下空格键就可以预览文件，不比打开文件浏览，很方便快捷，它自带的功能可能没有很全，有些文件无法预览，那么就需要给它装上插件。

这里是一些常用的插件： https://github.com/sindresorhus/quick-look-plugins#manually

可以直接使用 homebrew 进行安装

```bash
brew cask install qlcolorcode qlstephen qlmarkdown quicklook-json qlimagesize webpquicklook suspicious-package quicklookase qlvideo
```

## 5. 终端

终端绝对是 macOS 秒杀 Windows 的第一大杀器了，当然，有很多人会推荐使用 iTerm2 之类的第三方终端，就我个人而言，系统自带的就足够，不用再去装那些功能丰富的终端，适合自己的才是第一生产力，学习怎么去用的时间，可以写一个 [onmp](https://zhih.me/onmp-installation/) 了。

### 字体

终端的偏好设置你随便设置，怎么适合怎么来，我在这里只推荐一个必须设置的项，[FiraCode字体](https://github.com/tonsky/FiraCode)，你可以去他们的 github 页看看，相信你一定会爱上它。

### Zsh

它是个令人感到惊艳的 shell，关于它，自行搜索看看吧。

使用 homebrew 安装

```bash
brew install zsh
```

不出意外，现在就安装上了

前面finder设置里新建 `home` 目录的目的是防止每次进终端进行文件下载，或者进行其他操作时，把用户目录搞得一团糟

所以现在还要设置打开终端自动进入 `home` 目录

```bash
vi ~/.zshrc
```

在最后添加 `cd ~/home`

### Oh My Zsh

[Oh My Zsh](http://ohmyz.sh) 是 zsh 的一个扩展工具集，提供了丰富的扩展功能，没有他，zsh 将不再完整

#### 安装

```bash
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

#### 插件

Oh My Zsh 有丰富的插件

内置的可以在这里找到 https://github.com/robbyrussell/oh-my-zsh/tree/master/plugins

说几个我觉得比较好用的

1. [osx](https://github.com/robbyrussell/oh-my-zsh/tree/master/plugins/osx) 快捷命令

2. [brew](https://github.com/robbyrussell/oh-my-zsh/tree/master/plugins/brew) 快捷命令

3. [git](https://github.com/robbyrussell/oh-my-zsh/tree/master/plugins/git)  快捷命令

4. [colored-man-pages](https://github.com/robbyrussell/oh-my-zsh/tree/master/plugins/colored-man-pages) man 页面上色

5. [colorize](https://github.com/robbyrussell/oh-my-zsh/tree/master/plugins/colorize) 给输出代码上色
    
    要先安装 Pygments

    ```bash
    pip install pygments
    ```

    就可以用 `ccat` 命令输出高亮代码

6. [autojump](https://github.com/wting/autojump) 一种更快捷的文件系统导航方式
    
    ```bash
    brew install autojump
    ```

7. [syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting) 语法高亮
    
    ```bash
    git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
    ```

8. [autosuggestions](https://github.com/zsh-users/zsh-autosuggestions) 命令自动提示
    
    ```bash
    git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
    ```

9. [history-substring-search](https://github.com/zsh-users/zsh-history-substring-search) 历史搜索

    输入历史记录中任何命令的任何部分，然后按上下键筛选
    
    ```bash
    git clone https://github.com/zsh-users/zsh-history-substring-search ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-history-substring-search
    ```

在 zsh 配置文件中的 `plugins` 字段里添加插件

```bash
vi ~/.zshrc
```

像这样

```
plugins=(osx brew git colorize colored-man-pages autojump zsh-syntax-highlighting zsh-autosuggestions)
```

以上插件按需添加，不想要的删掉括号里的插件名字就行

重启终端，开始玩爽吧

## 6. Git

我不是针对谁，我只想说，不用 git 的程序员都是辣鸡

### 安装

```bash
brew install git
```

安装成功后可以使用 `git --version` 看到git版本号

### 连接 GitHub

[GitHub官方设置教程](https://help.github.com/articles/set-up-git/)

我这里就把它的简化一下

github 可以通过 https 和 ssh 连接，我这里推荐使用 https 连接，原因是设置简单、不易被防火墙挡

```bash
git config --global user.name "github用户名"
git config --global user.email "github注册邮箱"
```

这些配置信息会存到 `~/.gitconfig` 里

只是这样设置，每次使用都会提示输入密码，所以要告诉 Git 使用 osxkeychain helper 全局 credential.helper 配置

```bash
git config --global credential.helper osxkeychain 
```

下一次克隆需要密码的 HTTPS URL 时，系统会提示您输入用户名和密码，并授予访问 OSX 钥匙串的权限。完成此操作后，用户名和密码将存储在您的钥匙串中，并且不需要再次将它们输入到 Git 中。

至此，大功告成

## 7. 结语

macOS 作为一个对开发者友好的系统，还有很对技巧等着大家发掘，并且每个人的习惯都是不同的，而 macOS 也容纳了大家的不同，提供了大家个性化设置的基础，相信在你的调教下，它会成为你手中的大杀器。

>本文章发表于底噪博客 https://zhih.me , 转载请注明









