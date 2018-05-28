---
title: hexo 主题 casper 使用教程
date: 2017-11-18 13:43:00
tags: 
- hexo
- web
categories: 教程
cover_img: https://pic.zhih.me/blog/posts/hexo-casper-usage/cover.jpg
feature_img: https://pic.zhih.me/blog/posts/hexo-casper-usage/feature.jpg
description: 这是本人移植自 Ghost 的一个 hexo 主题，SEO 友好，自适应，多插件
keywords: hexo, Ghost, theme, web, hexo 主题
---

## 简述

这是本人移植自 [Ghost's Casper theme](https://github.com/TryGhost/Casper) 的一个 [Hexo](https://hexo.io) 主题。

项目地址 [https://github.com/xzhih/hexo-theme-casper](https://github.com/xzhih/hexo-theme-casper)

DEMO [https://xzhih.github.io/hexo-theme-casper/](https://xzhih.github.io/hexo-theme-casper/)

## 项目来由

最近搞了个博客，用的是 [Hexo](https://hexo.io) ，发现了很多不错的主题，在寻找主题的过程中发现了另一个博客程序 [Ghost](https://ghost.org) 。它的新版默认主题很和我的胃口，但是在github上搜索一通后，发现只有老版本的被移植到了 hexo，于是想自己动手把它移植过来，看了官方文档后发现hexo的主题还是相当好制作的，用了几天弄好了。当然，功能还不是很完善。

下面我就说一下主题的使用方法。

## 特性

- 文章封面图（在首页文章摘要上显示）
- 文章特色图（在文章详细页面上置顶）
- 自定义菜单 
- 自定义 favicon, logo, 头部背景, 作者头像
- 社交链接 ( 现在支持微博、推特、脸书 ) 
- 共三个插件（最新文章、分类、标签云）
- 内容目录
- 代码高亮 ( 使用 [highlight.js](https://highlightjs.org) 的 github 风格 )
- 自适应网页设计
- valine 评论系统
- Baidu 链接提交、Google Analytics
- SEO

## 安装方法

#### 下载

```shell
$ git clone https://github.com/xzhih/hexo-theme-casper.git themes/hexo-casper
```

#### 激活

把hexo配置文件 `_config.yml` 里的 `theme` 字段内容改为 `hexo-casper` 。

#### 升级

建议先备份一下在执行下面的操作。

```shell
$ cd themes/casper 
$ git pull
```

#### 添加统一的文章模板参数

把下面的内容加入到 `scaffolds/post.md`, 

```
cover_img:     # 在文章摘要上显示
feature_img:   # 在文章详细页面上置顶
description:   # 文章描述
keywords:      # 关键字
```

#### valine 评论系统

使用方法请到他的[官网](https://valine.js.org)查看，并结合下面的配置文件详细添加appID和appKey

**添加关于页面**

```
$ hexo new page about
```


## 自定义配置

编辑 `themes/hexo-casper/_config.yml` 设置你想显示出来的特性

```yaml
# config
rss:            # link
favicon: https://i.loli.net/2017/11/26/5a19c0b50432e.png
blog_logo: 
header_image: https://i.loli.net/2017/11/26/5a19c56faa29f.jpg
bio: This is a demo
post_toc: true

# 菜单
menu:
  About: /about
  Archives: /archives
  # 其他的可以按照上面的模板添加

# 作者
author_image:   # 链接
author_bio:     # 描述
author_location: # 地址

# 社交链接
social:
  facebook: https://www.facebook.com
  twitter: https://www.twitter.com
  twitter: https://twitter.com
  facebook: https://facebook
  telegram:
  
# 插件（显示在网站底部）
widgets:
  recent_posts: true
  category: true
  tagcloud: true
  # 这是个简洁的主题，我认为3个就够了

# 文章图片相册（点击图片可以放大）
# https://github.com/sachinchoolur/lightgallery.js
lightgallery: true

# valine 评论系统
# https://valine.js.org
comment: false
valine:
  notify: false # mail notifier , https://github.com/xCss/Valine/wiki 
  verify: false # Verification code
  appId: # your leancloud application appid
  appKey: # your leancloud application appkey
  placeholder: Just go go # comment box placeholder
  avatar: mm # gravatar style
  pageSize: 10 # pagination size

# PWA 
# 你需要在 hexo 目录的 source 文件夹里创建一个 manifest.json 文件
manifest: false

navColor: '3c484e'

# Baidu 链接提交
baidu: false

# Google Analytics
googleAnalytics: false
GA_TRACKING_ID: UA-XXXXXXXXXX-1

# CDN 链接
# 如果留空，则使用网站目录内的默认文件 
CDN: 
  jquery: https://cdn.staticfile.org/jquery/3.2.1/jquery.min.js
  highlightjs: https://cdn.staticfile.org/highlight.js/9.10.0/highlight.min.js
  lightgalleryjs: https://cdn.staticfile.org/lightgallery/1.3.9/js/lightgallery.min.js
  lightgallerycss: https://cdn.staticfile.org/lightgallery/1.3.9/css/lightgallery.min.css
```

## 源主题的版权声明和 License 

[https://github.com/TryGhost/Casper/blob/master/LICENSE](https://github.com/TryGhost/Casper/blob/master/LICENSE)

