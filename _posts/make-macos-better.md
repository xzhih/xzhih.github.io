---
title: MacOS这样更好用
date: 2018-04-04 02:35:34
tags: MacOS
categories: 心得
cover_img:
feature_img:
---

我之所以选择使用MacOS，是因为它是简洁高效的类Unix系统，对各种开发环境友好，并且近年来随着国内Mac的普及，各种应用软件也在MacOS上适配了，软件丰富度方面完全不用担心，并且MacOS下的软件更加的纯净简洁，不会像Windows下那样出现 “全家桶” 效应。

俗话说得好：工欲善其事，必先利其器

那么，刚装上一个新的系统，应该怎样去设置，让它更好用呢？

## 1. 系统设置

### dock栏（程序坞）

系统默认的dock栏是在底部的，在打开应用时会减少信息流可视面积，所以我们可以设置

- 把它放到屏幕左边
- 调小图标
- 设置鼠标放在图标上时变大

这样就可以省出更多的空间，并且按照从左到右的阅读习惯，放在右边比较合适。

![程序坞](https://i.loli.net/2018/04/04/5ac3f084c5899.png)

### finder（访达）

finder作为一个文件资源管理中心，一些小设置可以让你用的得心应手

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

![访达.png](https://i.loli.net/2018/04/04/5ac3f398d988a.png)

## 2. Xcode

Xcode是MacOS下重要的IDE

首先，在[App Store](https://itunes.apple.com/cn/app/xcode/id497799835?mt=12)安装Xcode。

Xcode提供了编译软件必备的Xcode Command Line Tools，它包含了GCC编译器，在装完Xcode之后我们需要执行一下命令安装它

```
$ xcode-select --install
```

他会提示安装，按照说明操作就可以了。

## 3. Homebrew

用过Linux的都知道包管理器，Debian系用的dpkg、红帽系用的rpm，而MacOS下最受追捧的就是[Homebrew](https://brew.sh/)了，它可以让我们安装和更新应用程序或库，是个大杀器。

### 安装

安装Homebrew需要前面提到的Xcode Command Line Tools，之后Homebrew所执行的编译包的任务全都依靠它。

在终端输入命令以下回车就能进行安装了

```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

在安装完成后执行以下命令，诊断一下有没有什么错误，或者Homebrew需要你做什么样的设置

```
$ brew doctor
```

brew就是homebrew的包管理命令了，用法类似debian的apt-get

### 换源

Homebrew默认的源服务器在国外，这样我们在国内使用的时候速度可能比较慢，阿里云提供了镜像源，我们可以使用以下命令替换

注意，以下命令为Zsh终端的配置，所以要执行 `brew install zsh` 安装zsh。

```
# 替换brew.git:
cd "$(brew --repo)"
git remote set-url origin https://mirrors.aliyun.com/homebrew/brew.git

# 替换homebrew-core.git:
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.aliyun.com/homebrew/homebrew-core.git

# 应用生效
brew update

# 替换homebrew-bottles:
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles' >> ~/.zshrc
source ~/.zshrc
```

### 用法

homebrew的用法和其它包管理器一样，如果你使用过，那么这步你可以不看

```
# 安装软件包
$ brew insatll 包名

# 搜索
$ brew search 包名

# 卸载
$ brew uninstall 包名

# 查看已安装列表
$ brew list

# 获取新列表
$ brew update

# 升级软件包
$ brew upgrade
```

## 4. 终端

终端绝对是MacOS秒杀Windows的第一大杀器了，当然，有很多人会推荐使用iTerm2之类的第三方终端，在这里我想说的是，系统自带的足以，功能丰富不代表好用，简洁快捷才是第一生产力。

### 字体

终端的偏好设置你随便设置，怎么适合怎么来，我在这里只推荐一个必须设置的项，[FiraCode字体](https://github.com/tonsky/FiraCode)，你可以去他们的github页看看，相信你一定会爱上它。

### Zsh

我们在上面已经提到过zsh，它是个令人感到惊艳的shell，关于它，自行搜索看看吧。

使用homebrew安装

```
$ brew install zsh zsh-completions
```

不出意外，现在就安装上了

前面finder设置里新建 `home` 目录的目的是防止每次进终端进行文件下载，或者进行其他操作时，把用户目录搞得一团糟

所以现在还要设置打开终端自动进入 `home` 目录

```
$ vi ~/.zshrc
```

在最后添加 `cd ~/home`

### Oh My Zsh

[Oh My Zsh](http://ohmyz.sh)是zsh的一个扩展工具集，提供了丰富的扩展功能，没有他，zsh将不再完整

#### 安装

```
$ sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

#### 插件

Oh My Zsh有丰富的插件，你可以在 `~/.zshrc` 里的 `plugins` 字段添加插件

这里我给几个推荐的插件

```
plugins=(git colored-man colorize github  pip python osx zsh-syntax-highlighting)
```

## 5. Git

我不是针对谁，我只想说，不用git的程序员都是辣鸡

### 安装

```
$ brew install git
```

安装成功后可以使用 `git --version` 看到git版本号

### 连接 GitHub

[GitHub官方设置教程](https://help.github.com/articles/set-up-git/)

我这里就把它的简化一下

github可以通过https和ssh连接，我这里推荐使用https连接，原因是设置简单、不易被防火墙挡

```
$ git config --global user.name "github用户名"
$ git config --global user.email "github注册邮箱"
```

这些配置信息会存到 `~/.gitconfig` 里

只是这样设置，每次使用都会提示输入密码，所以要告诉Git使用osxkeychain helper全局credential.helper配置

```
$ git config --global credential.helper osxkeychain 
```

下一次克隆需要密码的HTTPS URL时，系统会提示您输入用户名和密码，并授予访问OSX钥匙串的权限。完成此操作后，用户名和密码将存储在您的钥匙串中，并且不需要再次将它们输入到Git中。

至此，大功告成

## 6. 后话

MacOS作为一个对开发者友好的系统，还有很对技巧等着大家发掘，并且每个人的习惯都是不同的，而MacOS也容纳了大家的不同，提供了大家个性化设置的基础，相信在你的调教下，它会成为你手中的大杀器。











