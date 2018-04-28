# webApp
A Vue.js project for webApp

## 运行命令

#### 开发
> npm run dev

#### 构建
> npm run build

## 目录结构

    |── build
    |   |── build.js                 // 构建
    |   |── utils.js                 // 公共方法
    |   |── vue-loader.conf.js       // vue-loader配置
    |   |── webpack.base.js          // 开发、构建通用配置
    |   |── webpack.config.js        // 开发、构建差异配置常量
    |   |── webpack.dev.conf.js      // 开发配置信息
    |   └── webpack.prod.conf.js     // 构建配置信息
    |── dist
    │   |── static                   // 构建后的所有项目公共资源文件
    │   └── index.html               // 入口网页文件
    |── src
    │   |── api
    │   |── common
    │   |── components
    │   |── filter
    │   |── mixins
    │   |── router
    │   |── util
    │   |── views
    │   |   |── App.vue
    │   |   |── main.js
    │   |   └── template.html
    │   └── static
    └── README.md
