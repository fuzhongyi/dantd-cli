---
nav: 文档
group:
  title: 基础
  order: 1
order: 99
---

# 构建和部署

## 构建

当项目开发完毕，只需要运行一行命令就可以打包你的应用：

```bash
npm run build
```

由于 npro 使用的工具 [Umi](https://umijs.org/zh-CN) 已经将复杂的流程封装完毕，构建打包文件只需要一个命令 `umi build`，构建打包成功之后，会在根目录生成 `dist` 文件夹，里面就是构建打包好的文件，通常是 `*.js`、`*.css`、`index.html` 等静态文件。

如果需要自定义构建，比如指定 `dist` 目录等，可以通过 `config/config.js` 进行配置，详情参看：[Umi 配置v4](https://umijs.org/docs/api/config)。

## 分析构建文件体积

如果你的构建文件很大，你可以通过 `analyze` 命令构建并分析依赖模块的体积分布，从而优化你的代码。

```bash
npm run analyze
```

上面的命令会自动在浏览器打开显示体积分布数据的网页。

## 部署到非根目录

假设我们要部署项目到 `${host}/market` 这样一个非根目录中。首先我们需要在 `config/config.js` 中配置 [base](https://umijs.org/zh/config/#base),`base` 是 react-router 的前缀。我们需要将 base 配置为 `market`, 如果我们还需要将其部署到 `/market` 目录中，我们还需要设置 [`publicPath`](https://umijs.org/zh/config/#publicpath)。设置完之后是这样的：

```js
export default defineConfig({
  // ... some config
  base: '/market/',
  publicPath: '/market/',
  // ...
});
```

接下来我们就可以在 `${host}/market` 中访问我们的静态文件了。
