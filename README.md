# interview question bank

> iqbank 是一个用来方便总结面试题的笔记类应用

## 技术栈

react + react-router + mobx，ui 框架为 blueprintjs

## 项目结构

项目相关代码都在 src 文件夹中

入口文件：src/index.js

路由：src/App.js

scss 样式文件：src/index.scss

根组件（Editor、Login）：src/screen

其他下级组件：src/components

mobx 相关：src/store

另外还封装了一个给 axios 请求添加 token 的类：src/axiosWithToken.js

## 为什么写这个应用

最近在准备面试的时候，我总是在想，要是有一个应用能方便地浏览面试题，还可以编辑答案就好了。想到就做，在浏览了一些招聘网站的面试需求之后，我发现要求掌握 react 的公司比较多，所以技术选型就选了 react。

## 项目展示

整个应用为三栏式布局，知识树、题目列表、题目及解析

![iqbank](https://i.loli.net/2020/04/22/1c6xuQrSsvMIULP.png)

### 知识树

知识树部分是一个可以无限分级的树形结构，是我自己通过递归组件的方式实现的，没有使用 ui 框架提供的树组件。

最下方为新建根节点的工具栏，如果新建时不输入名称，会新建一个名称为“未命名”的根节点。

每个节点可以右键呼出菜单，进行新建下级节点、重命名、删除操作，如果是末端节点则无新建下级节点操作。

![知识树右键菜单](https://i.loli.net/2020/04/22/stpzmqnX7NW9B4i.png)

知识树在移动端看起来是这样：

![知识树移动端样式](https://i.loli.net/2020/04/22/DGLUAO3QNJ6uZIp.png)

### 题目列表

没有任何知识树末端节点被点击前，或者该被点击节点没有题目时，题目列表展示提醒，点击后展示当前知识点所收集的题目。

![题目列表提醒](https://i.loli.net/2020/04/22/pqz9nJoNfCkEOAP.png)

题目列表也支持右键菜单，但是只有重命名和删除操作。

![题目列表右键菜单](https://i.loli.net/2020/04/22/awcYL3uUeG9BsIm.png)

题目列表在移动端看起来是这样：

![题目列表移动端样式](https://i.loli.net/2020/04/22/yJVstnNKLpbfC61.png)

### 题目解析

当没有题目被点击时，题目解析处展示提醒，点击具体题目，可以查看解析。

解析支持在线编辑，点击左上角图标进入编辑状态

![编辑器](https://i.loli.net/2020/04/22/QrLp2sv3aOk814K.png)

同时编辑器还监听键盘左右键，可以切换前/后一道题目。

题目解析在移动端看起来是这样：

![题目解析移动端样式](https://i.loli.net/2020/04/22/vXwUcyaFgAGsbxo.png)
