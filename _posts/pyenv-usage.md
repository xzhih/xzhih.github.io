---
title: 使用Pyenv 管理PY的版本
date: 2018-04-05 22:34:12
tags: 
- Python
- macOS
categories: 教程
cover_img: https://pic.zhih.me/blog/posts/pyenv-usage/cover.jpg
description: 教你如何使用 Pyenv 管理 macOS 上的 Python 版本，在macOS上python多版本共存，互不干扰、相互独立，一个命令切换
keywords: Python, macOS, Pyenv
---

## 引言

前几天使用 pip 安装腾讯云 COS 的命令行工具 [coscmd](https://github.com/tencentyun/coscmd) 的时候，macOS 自带的 Python 和 pip 让我觉得不爽。

顺便装一下逼，上面提到的 [coscmd](https://github.com/tencentyun/coscmd) 我提交了几行代码，得到了 merge ，😏😏**我特么也是给腾讯提交过代码的人**😏😏。

首先是 pip ，我直接用 `easy_install` 安装的，在使用它安装 coscmd 时候，需要使用 sudo ，然后各种组件很难想我预想的那样顺利装上，总是需要加 sudo，应该是目录权限的原因。当然，这可能是我的锅，但是对于我来说，使用系统自带的环境是不好的，天知道哪天出错了会影响到什么，我更倾向于包管理器的那种安装方式，出问题就卸载从来。

然后是自带的 Python ，当然我并不是做 PY 开发的，但是接触一下总好，毕竟使用过太多的工具都是用 PY 编的，在之前使用的时候也遇到一些关于版本的问题，我之前还觉得自带了 Python 就美滋滋。然后想用 homebrew 直接自己装算了，但是有发现，这样也不灵活啊，有些时候要 py2.7、有的要 py3 ，那么问题来了，py 有没有和 nvm 一样的版本管理工具？

**废话，必须有的啊！**

这就是 [Pyenv](https://github.com/pyenv/pyenv) 了。

>pyenv lets you easily switch between multiple versions of Python. It's simple, unobtrusive, and follows the UNIX tradition of single-purpose tools that do one thing well.

上面引用他们 github 上的话，翻译过来就是：装，就对了。

## 安装

还是使用 homebrew 安装，关于 homebrew ，去我 [上一篇文章](https://zhih.me/make-macos-better/) 看看。

```bash
brew install pyenv
```

安装好之后，我们还需要在打开 shell 的时候自动执行 pyenv 的初始化

```bash
echo 'eval "$(pyenv init -)"' >> ~/.zshrc
```

重启你的 shell 就生效了

## 使用

我这里只说说基本的使用方法，毕竟我只算是个推荐人，具体的高级用法，找他们的 Wiki 看去

### 安装多个 Python 版本

首先是找到需要装的 Python 版本号

```bash
pyenv install --list
```

列出一堆各种的版本 Python ，要装哪个就记住版本号

比如说我这里要装个 2.7.14 和 3.6.5

```bash
pyenv install 2.7.14
pyenv install 3.6.5
```

这样就装上了，你就要问了，这不就和我用 homebrew 安装一样嘛，甚至它安装都调用了 homebrew ？

那下面就是 pyenv 真正起作用的时候了

### 版本管理

实际使用中，我们可能不同的项目需要不同的版本，pyenv 可以给全局切换版本，也可以在给不同的目录设置不同的版本

#### 全局

```bash
pyenv global 3.6.5
pyenv rehash
```

这下，使用 `python -V` 就能看到自己版本变成了 3.6.5

#### 当前目录

要给项目单独设置 Python 版本，需要 cd 进入目录

例如我要给当前目录设置为 miniconda3-4.3.30

```bash
pyenv local miniconda3-4.3.30
pyenv rehash
```

这样就可以了

#### 查看环境设置

```bash
pyenv versions
```

这个命令可以看自己装了哪几个版本，并且哪个目录给了哪个版本，写的清清楚楚

## 结语

人生苦短，我选 Python

>本文章发表于底噪博客 https://zhih.me , 转载请注明
>直接偷的人，你打球真蔡
