---
title: 给你的nginx加个防火墙
cover_img: https://pic.zhih.me/blog/posts/ngx-lua-waf/cover.jpg
date: 2018-11-27 01:39:34
tags: 
- nginx
- web
categories: 教程
description: 编译nginx支持ngx_lua_waf防火墙，从此不再怕被黑，前几天有个朋友跟我说，他的一个WordPress站经常访问慢，帮他看了一下日志，发现整天被人扫网站目录，开始我还以为是主机商帮扫漏洞之类的，后来发现实在是太密集了，看来不是...
keywords: ngx_lua_waf, nginx, nginx防火墙, 服务器防火墙, web防火墙，网站防火墙, nginx编译, brotli
ld_json_img: https://pic.zhih.me/blog/posts/ngx-lua-waf/waf.jpg
---

## 引言

前几天有个朋友跟我说，他的一个 WordPress 站经常访问慢。

帮他看了一下日志，发现整天被人扫网站目录的什么 phpmyadmin 或者 SQL 文件，要不就是被 CC，刚开始我还以为是主机商帮扫漏洞之类的，后来发现实在是太密集了，看来不是。

我就笑了，他那破站有啥值得扫的，不过 CC 的话倒也不奇怪，有些人就是爱搞这些无聊的事情。

然后他又说，用的是腾讯云的1元小鸡，刚开始非常流畅的啊，不至于现在这么惨吧。

我看了一下真搞笑，本身机器性能就不行了，还不做静态化，被 CC 的时候负载自然上去了，而且小鸡才 1M 的带宽，不慢才怪。

他说他的站就写写笔记或者转载一些文章，也不是什么重要的东西，但是整天被搞也是不太爽，怎么弄才能解决。。。

我想也是，虽然东西是垃圾，但好歹还是在用的，不过嘛解决是不可能解决的，只要别人能访问，你就会遇到这样那样的傻逼，不过改善还是可以啦。既然主机商的各种安全套餐咱们用不起，那就用一些大佬写好的方案吧。

找了一下，发现 ngx_lua_waf 是个不错的方案，但是太久不更新了，而且代码我看不懂，猝

最后找到 oneinstack 一键包内置的 ngx_lua_waf，基于之前的代码，不过重构 了，这下我能看懂了，以后要修改也能简单一些

## 介绍

[ngx_lua_waf](https://github.com/xzhih/ngx_lua_waf) 是一个高性能的轻量级 web 应用防火墙，基于 lua-nginx-module。

![ngx_lua_waf](https://pic.zhih.me/blog/posts/ngx-lua-waf/waf.jpg)

它具有以下功能：

```
防止sql注入，本地包含，部分溢出，fuzzing测试，xss,SSRF等web攻击
防止svn/备份之类文件泄漏
防止ApacheBench之类压力测试工具的攻击
屏蔽常见的扫描黑客工具，扫描器
屏蔽异常的网络请求
屏蔽图片附件类目录php执行权限
防止webshell上传
```

经过 [unixhot](https://github.com/unixhot/waf) 的修改和重构，拥有了以下功能：

```
支持IP白名单和黑名单功能，直接将黑名单的IP访问拒绝
支持URL白名单，将不需要过滤的URL进行定义
支持User-Agent的过滤，匹配自定义规则中的条目，然后进行处理（返回403）
支持CC攻击防护，单个URL指定时间的访问次数，超过设定值，直接返回403
支持Cookie过滤，匹配自定义规则中的条目，然后进行处理（返回403）
支持URL过滤，匹配自定义规则中的条目，如果用户请求的URL包含这些，返回403
支持URL参数过滤，原理同上
支持日志记录，将所有拒绝的操作，记录到日志中去
日志记录为JSON格式，便于日志分析，例如使用ELKStack进行攻击日志收集、存储、搜索和展示
```

这些功能刚好能满足我朋友的需求

## 安装

安装起来也是相当容易，说白了就是给 nginx 增加 ngx_devel_kit、lua-nginx-module 这两个模块，然后再修改 nginx 配置来运行 ngx_lua_waf。

### 一键安装

一键命令我已经给你们准备好了，一键命令会编译 nginx-1.15.6，编译的详细模块可以看我的这篇帖子 https://zhih.me/make-your-website-support-tls1-3 ，当然你也可以直接看脚本的代码

```
sh -c "$(curl -kfsSl https://raw.githubusercontent.com/xzhih/nginx-compile/master/install.sh)"
```

### 手动安装

#### 下载 ngx_lua_waf 防火墙的各种依赖及模块

```bash
cd /usr/src/
wget https://github.com/openresty/luajit2/archive/v2.1-20181029.tar.gz
tar xzvf v2.1-20181029.tar.gz
mv luajit2-2.1-20181029 luajit-2.1

wget https://github.com/openresty/lua-cjson/archive/2.1.0.6.tar.gz
tar xzvf 2.1.0.6.tar.gz
mv lua-cjson-2.1.0.6 lua-cjson

wget https://github.com/simplresty/ngx_devel_kit/archive/v0.3.1rc1.tar.gz
tar xzvf v0.3.1rc1.tar.gz
mv ngx_devel_kit-0.3.1rc1 ngx_devel_kit

wget https://github.com/openresty/lua-nginx-module/archive/v0.10.13.tar.gz
tar xzvf v0.10.13.tar.gz  
mv lua-nginx-module-0.10.13 lua-nginx-module
```

#### 编译安装 luajit

```bash
cd luajit-2.1
make -j2 && make install
echo '/usr/local/lib' >> /etc/ld.so.conf.d/local.conf
ldconfig
```

#### 编译安装 lua-cjson

```bash
cd /usr/src/lua-cjson
export LUA_INCLUDE_DIR=/usr/local/include/luajit-2.1 
make -j2 && make install
```

#### 设置 LUAJIT 环境变量

```bash
export LUAJIT_LIB=/usr/local/lib
export LUAJIT_INC=/usr/local/include/luajit-2.1
```

#### 编译 nginx 的时候加上以下两个模块

```bash
--add-module=../lua-nginx-module
--add-module=../ngx_devel_kit
```

#### 下载配置 ngx_lua_waf

```bash
cd /usr/local/nginx/conf/
git clone https://github.com/xzhih/ngx_lua_waf.git waf 

cat > /usr/local/nginx/conf/waf.conf << EOF
lua_shared_dict limit 20m;
lua_package_path "/usr/local/nginx/conf/waf/?.lua";
init_by_lua_file "/usr/local/nginx/conf/waf/init.lua";
access_by_lua_file "/usr/local/nginx/conf/waf/access.lua";
EOF

mkdir -p /usr/local/nginx/logs/waf 
chown www-data:www-data /usr/local/nginx/logs/waf 
```

你可以在 `/usr/local/nginx/logs/waf` 找到防火墙日志

#### 在 `nginx.conf` 里 include `waf.conf`

```
include waf.conf;
```

启动 nginx 并访问 http://你的IP/?a=a.sql 

就可以看到防火墙提示了

## Copyright

https://github.com/lj2007331/ngx_lua_waf

https://github.com/loveshell/ngx_lua_waf

https://github.com/unixhot/waf

>本文章发表于底噪博客 https://zhih.me , 转载请注明
>直接偷的人，你打球真蔡















