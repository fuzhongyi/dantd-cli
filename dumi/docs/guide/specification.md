---
nav: 文档
group:
  title: 基础
  order: 1
order: 98
---

# 规范

为了让项目代码组织更加规范，让开发能够更方便的定位到相关页面组件代码，我们定义了一套规范，请务必按规范执行。

## 页面代码

```
src
├── components
└── pages
    ├── Welcome        // 路由组件下不应该再包含其他路由组件，基于这个约定就能清楚的区分路由组件和非路由组件了
    |   ├── components // 对于复杂的页面可以再自己做更深层次的组织，但建议不要超过三层
    |   ├── Form.jsx
    |   ├── index.jsx  // 页面组件的代码
    |   └── index.less // 页面样式
    ├── Order          // 路由组件下不应该再包含其他路由组件，基于这个约定就能清楚的区分路由组件和非路由组件了
    |   ├── index.jsx
    |   └── index.less
    ├── User
    |   ├── components // group 下公用的组件集合
    |   ├── Login      // group 下的页面 Login
    |   ├── Register   // group 下的页面 Register
    |   └── util.ts    // 这里可以有一些共用方法之类，不做推荐和约束，看业务场景自行做组织
    └── *              // 其它页面组件代码
```

所有路由组件（会配置在路由配置中的组件）我们推荐以大驼峰命名打平到 pages 下面第一级（复杂的项目可以增加 group 层级，在 group 下放置 pages）。不建议在路由组件内部再嵌套路由组件 - 不方便分辨一个组件是否是路由组件，而且不方便快速从全局定位到路由组件。

我们推荐尽可能的拆分路由组件为更细粒度的组件，对于多个页面可能会用到的组件我们推荐放到 src/components 中，对于只是被单个页面依赖的（区块）组件，我们推荐就近维护到路由组件文件夹下即可。

#### ProTable

当页面涉及表格时统一使用 [ProTable](https://procomponents.ant.design/components/table) 简化流程。

对于存在新增，编辑数据的页面，我们可以在当前 page/components 下新建名为 `EditModal.jsx` 组件。

## 数据流

当我们需要在多个页面直接去共享这部分数据时，我们可以通过[@umijs/plugin-model](https://v3.umijs.org/zh-CN/plugins/plugin-model)实现这样的需求。

> `@umijs/plugin-model` - 一种基于 hooks 范式的简易数据管理方案（部分场景可以取代 dva），通常用于中台项目的全局共享数据。

### 新建 Model

在 `src/models` 目录下新建文件 xxx.js，文件名会成为 model 的 namespace。

```jsx
// counter.js
import { useState, useCallback } from 'react';

export default () => {
  const [counter, setCounter] = useState(0);
  const increment = useCallback(() => setCounter((c) => c + 1), []);
  const decrement = useCallback(() => setCounter((c) => c - 1), []);
  return { counter, increment, decrement };
};
```

### 使用 Model

在代码中使用 model，需要从 umi 中导出 useModel。useModel 是一个 React Custom Hook，传入 namespace 即可获取对应 model 的返回值。

```jsx
import { useModel } from '@umijs/max';

export default () => {
  const { counter } = useModel('counter');
  return <div>{counter}</div>;
};
```

上述例子中的 counter 会包含 counter model 中 counter 的值，即：0；

### 全局初始数据

#### 初始化

在 umi 的运行时配置 `src/app.js` 中添加运行时配置 `getInitialState` ，该配置是一个 async 的 function，示例如下：

```jsx
export async function getInitialState() {
  return {
    currentUser: {
      userName: 'xxx',
    },
  };
}
```

#### 在组件中消费

该方法返回的数据最后会被默认注入到一个 namespace 为 `@@initialState` 的 model 中。可以通过 `useModel` 这个 hook 来消费它：

```jsx
import React from 'react';
import { useModel } from '@umijs/max';
import { Spin } from 'antd';
export default () => {
  const { initialState, loading, refresh, setInitialState } =
    useModel('@@initialState');
  if (loading) {
    return <Spin />;
  }
  return <div>{initialState.currentUser.userName}</div>;
};
```

API:

| 返回值          | 类型                  | 说明                          |
| --------------- | --------------------- | ----------------------------- |
| initialState    | T                     | getInitialState 的返回值      |
| loading         | boolean               | 是否处在加载状态              |
| refresh         | () => void            | 重新执行 getInitialState 方法 |
| setInitialState | (newState: T) => void | 手动设置初始值                |

## 样式

组件化模式思考，对于非页面抽离组件我们使用 `CSS-in-JS` 的方式将 CSS 从文档级别抽象到组件级别。

```jsx
import { useEmotionCss } from '@ant-design/use-emotion-css';
import {
  FormattedMessage,
  history,
  SelectLang,
  useIntl,
  Helmet,
  useModel,
} from '@umijs/max';

const Lang = () => {
  const langClassName = useEmotionCss(({ token }) => {
    return {
      position: 'fixed',
      top: 20,
      right: 40,
      color: token.colorWhite,
      borderRadius: token.borderRadius,
      ':hover': {
        color: token.colorInfo,
        backgroundColor: token.colorInfoBg,
      },
    };
  });

  return (
    <div className={langClassName} data-lang>
      <SelectLang />
    </div>
  );
};

export default Lang;
```

对于 page 页面我们依然使用 `CSS Modules` 的方式。

```jsx
// example.js
import styles from './example.less';
export default ({ children }) => <div className={styles.title}>{children}</div>;
```

```less
/*  example.less */
.title {
  margin-bottom: 16px;
  color: @heading-color;
  font-weight: 600;
}
```

## 组件

### 返回单根元素

如果 React 组件里面返回多个元素，用 `<></>` 将它们包裹起来。

```jsx
<>
  <h1>Hedy Lamarr's Todos</h1>
  <img src="https://i.imgur.com/yXOvdOSs.jpg" alt="Hedy Lamarr" class="photo" />
</>
```

### 条件渲染

当出现条件判断对元素进行展示隐藏时，应避免使用三目运算。

```git
const Title = () => {
-  return flag ? <h1>This is title</h1>: null;
+  return flag && <h1>This is title</h1>;
}
```

### useState

根据情况对 `state` 进行拆分，避免**粒度**过细，导致代码冗余。

例如：

```jsx
const [width, setWidth] = useState(100);
const [height, setHeight] = useState(100);
const [left, setLeft] = useState(0);
const [top, setTop] = useState(0);
```

- 将完全不相关的 `state` 拆分为多组 `state`。比如 `size` 和 `position`
- 如果某些 `state` 是相互关联的，或者需要一起发生改变，就可以把它们合并为一组 `state`。比如 `left` 和 `top`。

```jsx
const [state, setSize] = useState({
  width: 100,
  height: 100,
});
const [state, setPosition] = useState({
  width: 100,
  height: 100,
});
```

## 接口定义

对于接口，针对每一个 page，我们在 `src/services` 目录下创建以 page 名称小驼峰命名的 js 文件，并且针对不同功能类型的请求，附加前缀。

| 类型 | 前缀       |
| ---- | ---------- |
| 新增 | **add**    |
| 删除 | **remove** |
| 更新 | **update** |
| 查询 | **fetch**  |

例如：

```js
// instance.js

/** 添加 instance 数据 */
export async function addInstance(data) {
  return request('/instance/add', { method: 'POST', data });
}

/**
 * 删除 instance
 * @param {string} instanceId
 * @returns {Promise}
 */
export async function removeInstance(instanceId) {
  return request('/instance/delete', {
    method: 'POST',
    data: {
      instanceId,
    },
  });

/** 更新 instance 数据 */
export async function updateInstance(data) {
  return request('/instance/edit', { method: 'POST', data });
}

/** 获取 instance 列表*/
export async function fetchInstanceList({ current, ...rest }) {
  const data = { pageNum: current, ...rest };
  if (data.createTime) data.createTime = +new Date(data.createTime);
  const res = await request('/instance/query', { method: 'POST', data });
  return {
    data: res.data.instanceList,
    success: true,
    total: res.data.totalNum,
  };
}
```

针对 [ProTable](https://procomponents.ant.design/components/table#request) 查询的接口，我们可参考上述 `fetchInstanceList` 方法进行封装。

#### 参数数量

当参数数量不超过 3 个（包含 3 个）可以直接使用多个形参传参即可，一旦参数数量大于 3 个，而且存在多个可选参数，有些参数是不必要的，但是参数又是按照顺序进行传递的，这个时候一定要把参数转换成对象进行参数传递。

```jsx
// 🔴 错误的作法
const functionA = (a, b, c, d, e) => {};

// ✅ 正确的做法
const functionB = ({ a, b, c, d, e }) => {};
```

## 国际化

项目中需要用到文案的地方均须配置国际化，配置文件按模块划分为三部分:

- `page.js` - 页面文案配置
- `menu.js` - 菜单文案配置
- `component.js` - 组件文案配置

根据不同业务场景配置文案到相应的地方。

#### 使用

当直接作为组件进行 DOM 展示时使用 `FormattedMessage`：

```jsx
import { FormattedMessage, useIntl } from '@umijs/max';

export default () => {
  return <FormattedMessage id="xxx.xxx" />;
};
```

当用作方法调用或作为 props 进行参数传递时使用 `useIntl`：

```jsx
import { useIntl } from '@umijs/max';
import { message } from 'antd';
import { ProForm, ProFormText } from '@ant-design/pro-components';

export default () => {
  const intl = useIntl();

  const handleFinish = (value) => {
    message.info(intl.formatMessage({ id: 'xxx.xxx' }));
  };

  return (
    <ProForm
      title={intl.formatMessage({ id: 'xxx.xxx' })}
      onFinish={handleFinish}
    >
      <ProFormText name="name" label={intl.formatMessage({ id: 'xxx.xxx' })} />
    </ProForm>
  );
};
```
