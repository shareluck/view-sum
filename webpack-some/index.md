# webpack 知识点

## 概念

### webpack 是什么?

用于现代 js 引用程序的 静态模块打包工具

### webpack 几个核心点
1. 入口( entry )

    打包从什么地方开始  

2. 出口( output )

    生成的 bundle 放在哪里

3. 模块( module )

    可以导出给其他文件使用的文件

4. 加载器( loader )

    webpack 只能理解 JavaScript 和 JSON 文件,
    loader 将 其他类型的文件 转换为有效的模块

5. 插件( plugin )

    webpack 在打包过程中,会派发事件, plugin 提供在不同事件中的操作 

### 内部原理

1. chunk 

webpack **打包过程中** 的表现形式

2. bundle 

webpack **打包之后** 的表现形式

3. chunk 和 bundle 的关系


4. 热更新 ( HMR )

5. Tree Shaking


