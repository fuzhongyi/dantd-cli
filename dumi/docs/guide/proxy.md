---
nav: 文档
group:
  title: 基础
  order: 1
order: 1
---

# Proxy

在开发中我们可能需要区分多种情况，比如开发环境，测试环境，预发环境，正式环境，在 npro 中我们可以通过 `config/proxy.js` 配置不同环境变量对应的值来实现这个需求。

```jsx
// dev | test | pre | prod
export default {
  // ....
  dev: {
    '/api/': {
      target: 'https://172.31.2.172:8444',
      changeOrigin: true,
      secure: false,
    },
  },
  test: {
    '/api/': {
      target: 'https://172.31.2.209:8444',
      changeOrigin: true,
      secure: false,
    },
  },
  // ....
};
```

通过在 package.json 中配置好各种快捷命令，就可以做到快速切换。

```json
{
  "scripts": {
    "start:dev": "cross-env REACT_APP_ENV=dev max dev",
    "start:test": "cross-env REACT_APP_ENV=test max dev",
    "start:pre": "cross-env REACT_APP_ENV=pre max dev",
    "start:pre": "cross-env REACT_APP_ENV=prod max dev"
  }
}
```
