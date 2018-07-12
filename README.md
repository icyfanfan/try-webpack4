# 基于 vue 多入口项目升级 webpack4 实践 DEMO

## 项目特点

-   多页面多入口
-   vue + scss

## 环境

-   [Node.js](https://nodejs.org/en/) ，推荐最新 LTS
-   [Yarn](https://yarnpkg.com/zh-Hans/docs/install)，安装最新版即可

进入`try-webpack4`项目，安装依赖，执行：

```shell
➜  yarn
```

执行完毕，通过命令，启动项目：

```shell
➜  yarn dev
```

## 目录说明

```
├── README.md  
├── package.json  
├── .babelrc  
├── yarn.lock  
├── .gitignore  
├── .env  
├── src  // 源码目录
│   ├── entry  // 多页面html入口
│   ├── components  // 组件代码入口
│   ├── assets   // 其他资源，图片，字体等
├── webpack4 // webpack4构建配置  
```
