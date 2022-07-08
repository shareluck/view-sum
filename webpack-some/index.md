# webpack

## webpack 是什么?

用于现代 js 引用程序的 静态模块打包工具 .

## webpack 的打包过程
1. 初始化参数 shell webpack.config.js  ( 命令行参数 或者 配置文件参数)
2. 初始化 compiler 对象 加载所有配置 ,开始编译
3. 确定入口文件 
4. 编译: 从入口文件开始 调用 loader 解析文件 递归查找依赖
5. 完成编译: 得到 模块编译后的内容 和 依赖关系
6. 输出资源:根据得到的 依赖关系 组装成 包含 多个 module 的 chunk
7. 通过配置 指定名字 输出到 指定文件夹


## webpack 几个核心点
1. 入口( entry ) : 打包从什么地方开始 

2. 出口( output ) : 生成的 bundle 放在哪里

3. 模块( module ) : js 中的模块  有 ESM CJS AMD ASSETS( video image fonts css ====)

4. 加载器( loader ) :  loader 将 非js的模块 转换为 可以识别的 js模块

5. 插件( plugin ) : webpack 在打包过程中,会派发事件, plugin 提供在不同事件中的操作 

6. compiler : 包含 webpack 的所有配置 . 可以理解为webpack 的实例

7. compilation : 包含 当前的模块资源 编译生成资源 . 打包过程中 检测到文件变化 就会创建新的compilation

8. chunk  和   bundle   多个 module 组成的代码块

    - chunk : webpack **打包过程中** 的表现形式    

    - bundle : webpack **打包之后** 的表现形式

    - **大部分是一一对应的当有 sourcemap 或者splitChunk 时 可能会对应多个**

## 实现
### 概览
1. 找到入口文件
2. 解析入口文件 , 提取依赖 
3. 提取依赖的依赖 (递归提取依赖) 创建所有文件 的依赖图 描述所有文件的依赖关系
4. 通过依赖关系 将所有文件打包成一个文件

### 开始
1. 新建源文件
entry.js   message.js  name.js 

2. 编写打包工具
wb.js

3. 分析ast   
https://astexplorer.net/    

通过 file -> program -> body -> ImportDeclaration -> source -> value  可以找到 import 的模块的路径

eg: import message from './message.js'  上述的 value 就是 './message.js'

4. 生成 ast  用到 babylon (基于 babel 的js 解析) 工具 

5. 通过 babel-traverse  遍历 ast 找到 value  建立 依赖数组 将 value 加入依赖数组

6. 将依赖数组 与 引入依赖的文件 和 唯一标识符 组装 返回

7. 建立依赖图 
7.1 首先建立一个 数组 存放所有的 资源
7.2 遍历所有资源 拿到文件目录 
7.3 遍历 资源的依赖 deps  转换路径 文件目录 + dep 的 路径  
7.4 通过绝对路径生成 依赖的资源
7.5 递归调用 : 通过将生成的依赖的资源 加入 所有资源的 数组 完成 递归调用

8. 相对路径转换成绝对路径


## 热更新 ( HMR )

## Tree Shaking