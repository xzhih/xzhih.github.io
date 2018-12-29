---
title: hexo主题casper使用教程
date: 2017-11-18 13:43:00
tags: 
- hexo
- web
categories: 教程
cover_img: https://pic.zhih.me/blog/posts/hexo-casper-usage/cover.jpg
feature_img: https://pic.zhih.me/blog/posts/hexo-casper-usage/feature.jpg
description: 这是本人移植自 Ghost 的一个 hexo 主题，SEO 友好，自适应，多插件，经过几次的修改更新，现在已经比较完善了，大多功能都是主题集成的，不需要再安装插件 ...
keywords: hexo, Ghost, theme, web, hexo 主题
ld_json_img: https://pic.zhih.me/blog/posts/hexo-casper-usage/feature.jpg
---

## 简述

这是本人移植自 [Ghost's Casper theme](https://github.com/TryGhost/Casper) 的一个 [Hexo](https://hexo.io) 主题。

项目地址 [https://github.com/xzhih/hexo-theme-casper](https://github.com/xzhih/hexo-theme-casper)

DEMO [https://xzhih.github.io/hexo-theme-casper/](https://xzhih.github.io/hexo-theme-casper/)

## 项目来由

最近搞了个博客，用的是 [Hexo](https://hexo.io) ，发现了很多不错的主题，在寻找主题的过程中发现了另一个博客程序 [Ghost](https://ghost.org) 。它的新版默认主题很和我的胃口，但是在github上搜索一通后，发现只有老版本的被移植到了 hexo，于是想自己动手把它移植过来，看了官方文档后发现hexo的主题还是相当好制作的，用了几天弄好了。当然，功能还不是很完善。

经过几次的修改更新，现在已经比较完善了，大多功能都是主题集成的，不需要再安装插件

下面我就说一下主题的使用方法。

## 特性

- 文章封面图（在首页文章摘要上显示）
- 文章特色图（在文章详细页面上置顶）
- 自定义菜单 
- 自定义 favicon, logo, 头部背景, 作者头像
- 社交链接 ( 现在支持 github、哔哩哔哩、YouTube、微博、推特、脸书 ) 
- 共三个插件（最新文章、分类、标签云）
- 内容目录
- 代码高亮
- 响应式网页设计
- 懒加载
- 主题集成本地搜索
- Valine 评论系统
- Baidu 链接提交、Google Analytics
- Service Worker

## 安装方法

### 下载

```bash
git clone https://github.com/xzhih/hexo-theme-casper.git themes/hexo-casper
```

### 激活

把hexo配置文件 `_config.yml` 里的 `theme` 字段内容改为 `hexo-casper` 。

### 升级

建议先备份一下在执行下面的操作。

```bash
cd themes/casper 
git pull
```

### 添加统一的文章模板参数

把下面的内容加入到 `scaffolds/post.md`, 

```yaml
cover_img:     # 在文章摘要上显示
feature_img:   # 在文章详细页面上置顶
description:   # 文章描述
keywords:      # 关键字
```

### valine 评论系统

使用方法请到他的[官网](https://valine.js.org)查看，并结合下面的配置文件详细添加appID和appKey

**添加关于页面**

```bash
hexo new page about
```

## 自定义配置

编辑 `themes/hexo-casper/_config.yml` 设置你想显示出来的特性

```yaml
# Config
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
  bilibili:
  youtube:
  
# 插件（显示在网站底部）
widgets:
  recent_posts: true
  category: true
  tagcloud: true
  # 这是个简洁的主题，我认为3个就够了

# 文章图片相册（点击图片可以放大）
# https://github.com/sachinchoolur/lightgallery.js
lightgallery: true

# 懒加载
# 首页已经默认开启，其他页面在此开启
# https://github.com/dinbror/blazy
lazyload: true

# 搜索功能
local_search: true

# Valine 评论系统
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
service_workers: false

navColor: '3c484e'

# Baidu 链接提交
baidu: false

# Google Analytics
googleAnalytics: false
GA_TRACKING_ID: UA-XXXXXXXXXX-1

```

## 本地搜索功能参考

https://github.com/wzpan/hexo-generator-search 
https://github.com/SuperKieran/hexo-generator-search-zip

## 源主题的版权声明和 License 

[https://github.com/TryGhost/Casper/blob/master/LICENSE](https://github.com/TryGhost/Casper/blob/master/LICENSE)

>本文章发表于底噪博客 https://zhih.me , 转载请注明
