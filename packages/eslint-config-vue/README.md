# @chaos1ee/eslint-config-vue

供 Vue3 项目使用的 EsLint 配置。

1. @chaos1ee/vue 不支持 Typescript 的项目使用
2. @chaos1ee/vue/typescript 支持 Typescript 的项目使用

## 使用

### 安装

```
yarn install -D eslint @chaos1ee/eslint-config-vue @typescript-eslint/parser @typescript-eslint/eslint-plugin @vue/eslint-config-typescript eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue
```

### 引入到项目中

例如 .eslintrc.js ：

```javascript
module.exports = {
  extends: ['@chaos1ee/vue/typescript'],
  rules: {},
};
```
