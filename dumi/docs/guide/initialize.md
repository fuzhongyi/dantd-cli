---
nav: 文档
group:
  title: 基础
  order: 0
---

# 初始化

我们提供了 pro-cli 来快速的初始化脚手架。

## 环境准备

确保正确安装 [Node.js](https://nodejs.org/en/) 且版本为 14+ 即可。

```bash
$ node -v
v14.19.1
```

## 脚手架

```bash
# 使用 npm
$ npm i -g @ncs/pro-cli

# 先找个地方建个空目录。
$ mkdir myapp && cd myapp

# 初始化项目
$ npro init

# 安装依赖
$ npm install

# 启动项目
$ npm run start
```

## 目录结构

我们已经为你生成了一个完整的开发框架，提供了涵盖中后台开发的各类功能和坑位，下面是整个项目的目录结构。

```bash
├── config                   # umi 配置，包含路由，构建等配置
├── public
│   └── favicon.png          # Favicon
├── src
│   ├── assets               # 本地静态资源
│   ├── components           # 业务通用组件
│   ├── layouts              # 通用布局
│   ├── models               # 全局 dva model
│   ├── pages                # 业务页面入口和常用模板
│   ├── services             # 后台接口服务
│   ├── utils                # 工具库
│   ├── locales              # 国际化资源
│   ├── global.less          # 全局样式
│   └── global.ts            # 全局 JS
├── README.md
└── package.json
```

## 开发

脚手架初始化成功之后就可以开始进行开发了。
