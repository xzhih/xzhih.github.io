---
title: 让你的网站支持macOS和IOS的深色模式
cover_img: https://pic.zhih.me/blog/posts/website-darkmode-on-macos/cover.jpg
date: 2019-03-26 12:52:01
tags: 
- web
- macOS
categories: WEB
description: macOS Mojave 深色模式现已支持网页，本博客第一时间进行了适配，使用方式很简单，只需要一个媒体查询即可
keywords: 深色模式, Dark Mode, macOS Mojave, prefers-color-scheme, CSS, 暗黑主题
---

## 前言

如果你在使用 macOS 10.14.4 或者之后的系统，在系统内开启深色模式，打开 Safari 浏览器，你会发现我的博客变成了暗黑版本。

<p class="success">本文发表于2019-03-26，而在2019-06-04凌晨，Apple 发布了 IOS 13，本文所说的方法也同时适用于 IOS Safari</p>

<p class="success">2019-08-08 今天突然发现 Chrome 也支持了</p>

深色模式（Dark Mode）是 Apple 在 macOS Mojave 上全新推出的一项功能，macOS 内置的 App 能完美支持，凭借着易用的接口，越来越多的第三方 App 已经进行了适配，可大家使用最多的浏览器却没能很好的支持，虽然你可以使用 Safari 的阅读视图浏览深色模式下的页面内容，但体验终归没有网站自身支持的好。

原因主要有两个，一是浏览器没有给出让开发者适配的接口，二是网站设计并不统一，强行进入深色模式会破坏页面的设计和内容的可读性。

于是经过几次的升级，macOS 终于在 Safari 12.1 中加入了一个新的媒体查询 `prefers-color-scheme`，并且 FireFox 67 也开始进行支持，其他浏览器的具体支持情况可在这里查看：https://caniuse.com/#search=prefers-color-scheme

## 简单使用

```
Name:   prefers-color-scheme
For:    @media
Value:  no-preference | light | dark
```

- no-preference：无颜色偏好
- light：浅色模式
- dark：深色模式

和你是用的其他媒体查询一样，用起来很简单

```CSS
@media (prefers-color-scheme: light) {
    /* 浅色模式样式 */
}

@media (prefers-color-scheme: dark) {
    /* 深色模式样式 */
}
```

默认都是浅色模式的，所以我们只写深色模式的样式就行

## 使用CSS变量

现在也页面都会涉及到大量的样式，要适配深色模式，最好使用变量。

```CSS
:root {
  --background-color: #FFFFFF;
  --content-color: #15171A;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background-color: #222;
    --content-color: #dfdfdf;
  }
}

.main-page {
    background: var(--background-color);
}

.full-content {
    color: var(--content-color)
}
```

上面的例子中，只定义了几个颜色相关的样式，事实上你可以跟其他媒体查询一样，定义其他的样式，让你的深色模式有更多不同的布局。

## 颜色

颜色这个就看自己喜欢了，不过要注意一点，如果你是使用 macOS 内置 App 的配色，强调色会改变一些基础配色，比如强调色不是石墨色的时候，背景颜色会变得比较暖。

在设置颜色的时候，要保证内容的可读性，我们需要将文本和背景的颜色对比度保持在一个安全的范围内，这时候你需要用到这个工具： https://github.com/leaverou/contrast-ratio

## 图片

在写好颜色相关的样式之后，你会发现页面上的图片变得很刺眼，这时你可以降低一下图片的透明度，具体降多少也是看你背景设置的色深，另外可以设置一下鼠标悬停时恢复透明度，这样能有更好的体验。

我用的 blazy 懒加载，所以是这样设置的

```CSS
@media (prefers-color-scheme: dark) {
    .b-lazy.b-loaded {
        opacity: .9;
        transition: opacity .5s ease-in-out;
    }

    .b-lazy.b-loaded:hover {
        opacity: 1;
    }
}
```

## 后话

在深色模式推出之后，得到了不错的反响，我认为 IOS 13 会引入一定深色模式。另外，Windows 也有“暗”模式，相信越来越多的应用会进行这样深色模式的适配，在 macOS 10.14.4 升级之后，我在第一时间进行了博客主题更新，只有大家都用了这个新的媒体查询，才会推动其他平台和浏览器的适配，好东西值得推崇。

>本文章发表于底噪博客 https://zhih.me , 转载请注明
>直接偷的人，你打球真蔡

