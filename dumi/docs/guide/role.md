---
nav: 文档
group:
  title: 基础
  order: 1
order: 2
---

# 权限管理

通过修改 `src/access.js` 定义用户角色权限。

```jsx
// src/access.js
export default function access(initialState) {
  const { currentUser } = initialState ?? {};
  return {
    superAdmin: currentUser && currentUser.level === 1,
  };
}
```

## 路由和菜单

如果需要对路由还有菜单进行权限控制，可以直接在路由原有基础配置上加上权限控制相关的属性，即可快速实现路由和菜单的权限控制。

只需要按以下方式在常规路由配置中加上 `access` 这一项即可：

```jsx
// config/config.ts
import { defineConfig } from 'umi';
export default defineConfig({
  routes: [
    {
      path: '/user',
      // ...
    },
    {
      path: '/admin',
      // ...
      access: 'superAdmin', // 会调用 src/access.js 中返回的 superAdmin 进行鉴权
    },
  ],
  // ...
});
```

## 页面内

> 【注意】使用 useAccess, Access 前，需要在 config/config.js 存在配置 _access: {}_，其他配置详见 [@umijs/plugin-access](https://v3.umijs.org/zh-CN/plugins/plugin-access)

使用示例如下：

```jsx
import { useAccess, Access } from 'umi';
import { Button } from 'antd';
const Page = (props) => {
  const handleClick = () => {
    if (access.superAdmin) {
      // 任意操作
    }
  };
  const access = useAccess(); // access 实例的成员: superAdmin
  return (
    <>
      <Access
        accessible={access.superAdmin}
        fallback={<div>Can not read content.</div>}
      >
        Content.
      </Access>
      <Button onClick={handleClick}>Click</Button>
    </>
  );
};
```

你可以通过 `useAccess` hook 来获取权限定义，另外我们内置了 `Access` 组件用于页面的元素显示和隐藏的控制。

`Access` 组件只有 hooks 的用法，如果需要在 class 组件中使用的话，可以把需要用到权限的拆分为 function：

```jsx
const Button = () => {
  const access = useAccess();
  // 权限处理
  return <Button />;
};
```
