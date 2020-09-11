## vue-page-navigation

Vue 单页应用导航管理器，像原生 app 一样管理页面栈而不是销毁。


## 功能特性

- 基于vue-router进行扩展，原有导航逻辑不变
- 参考keep-alive源码，实现`include`、`exclude`、`max`属性
- `push`或者`forward`的时候重新渲染页面，`cache` 中会添加新渲染的页面
- `back`或者`go（负数）的时候先前的页面不会渲染`，而是从`cache`中读取缓存，并且这些页面保留着之前的内容状态，并且把不用的页面从`cache`中移除
- `replace`会更新`cache`中的当前页面
- 回退到之前页面的时候有`activated`钩子函数出发
- 支持浏览器的前进后退


## 安装和用法

### 安装

``` bash
npm install vue-page-navigation
```

### 使用

``` js
import Vue from 'vue'
import VuePageNavigation from '@murphy/vue-page-navigation';

// vue-router实例必须传入
Vue.use(VuePageNavigation, { router });
```

```
// App.vue
<template>
  <div id="app">
    <VuePageNavigation>
      <router-view ></router-view>
    </VuePageNavigation>
  </div>
</template>
```

use `Vue.use` to install `vue-page-navigation
使用之前需要注册插件

```
Vue.use(VuePageNavigation, options);
```

Options 说明：

| 属性    | 描述                      | 类型   | 默认值             |
| ------- | ------------------------- | ------ | ------------------ |
| router  | vue-router实例            | Object | -                  |
| name    | VuePageNavigation组件名称 | String | 'VuePageNavigation |
| keyName | 路径参数属性              | String | 'PNK'              |

注册的时候可以指定 VuePageStack 的名字和 keyName

``` js
Vue.use(VuePageNavigation, { router, name: 'VuePageNavigation', keyName: 'PNK' });
```

组件输入属性，与`keep-alive`相似

| 属性    | 描述                 | 类型                  | 默认值 |
| ------- | -------------------- | --------------------- | ------ |
| include | 始终缓存的组件name   | String, RegExp, Array | -      |
| exclude | 永远不缓存的组件name | String, RegExp, Array | -      |
| max     | 缓存最大数量(LRU)    | String , Number       | 50     |

使用组件可以指定输入属性
```vue
<VuePageNavigation :inlcude="include" :exclude="exclude" :max="50">
  <router-view ></router-view>
</VuePageNavigation>
```



## 相关说明

### keyName

为什么会给路由添加`keyName`这个参数，是为了支持浏览器的后退，前进事件，这个特性在 webApp,微信公众号和小程序很重要

### 原理

获取当前页面实例部分参考了`Vue`源码中`keep-alive`的部分

### 感谢

这个插件同时借鉴了[vue-navigation](https://github.com/zack24q/vue-navigation)和[vue-page-stack](https://github.com/hezhongfeng/vue-page-stack)，很感谢他们给的灵感。

### License

[MIT](http://opensource.org/licenses/MIT)

<p style="font-size:18px;" align="center">👉 `来都来了，点个 Star⭐️ 支持一下吧` 👈</p>
