// 读取文件  fs.readFileSync(fileName,'utf-8')
const fs = require('fs')
// 相对路径转绝对路径时 需要用到  
const path = require('path')
// 生成 ast  需要 
const babylon = require('babylon');
// 遍历 ast 需要
const traverse = require('babel-traverse').default;
// 将 ast 转换成 code 需要的
const babel = require('babel-core');
// 
let  ID = 0

// 创建一个资源  
// {
//     deps:[], 当前文件的依赖数组
//     id:'number' , 当前文件的唯一标识符   为方便理解 使用自增 ID  的形式
//     filePath : 'string' , 当前文件的路径
//     code : ”string“ , 当前文件 被 babel 转换的 code
// }

/**
 *  创建资源的函数 
 *
 * @param {*} filePath  传入的文件路径
 * @return {*} 
 */
function createAsset(filePath){
    // 获取文件内容  fs.readFileSync(filePath,'utf-8')
    const content = fs.readFileSync(filePath,'utf-8')
    // 将内容转换成 ast   babylon.parse(content,{sourceType:'module'})
    const ast = babylon.parse(content,{sourceType:'module'})
    // 初始化  依赖数组
    const deps = []
    //遍历 ast 取到 ImportDeclaration 节点  的 source.value 属性 即为 依赖项的 路径
    traverse(ast,{
        ImportDeclaration:({
            node
        }) => {
            // 将 依赖项路径 存入 依赖数组
            deps.push(node.source.value)
        }
    })
    // ID 自增
    const id = ID++ 

    // 获取 通过 babel 转换后  的 代码
    let { code } = babel.transformFromAst(ast,null,{
        presets:['env']
    })
    //  返回 固定结构的资源
    return {
        filePath,
        id,
        deps,
        code
    }
}


/**
 *  创建 依赖图 的函数 
 *
 * @param {*} entry  入口 地址 
 * @return {*} 
 */
function createGraph(entry){
    // 传入 入口 路径  通过 创建 资源函数 创建 入口路径 文件的 资源
    const asset =  createAsset(entry)
    // 初始化 所有 资源 数组 将入口文件资源放入
    const allAssets = [asset]
    // 遍历 所有资源数组
    for (const asset of allAssets) {
        // 通过 每一项资源的 filePath 找到 其 目录 
        const dirname = path.dirname(asset.filePath)
        //初始化 每一项资源的 mapping 
        asset.mapping = {}
        // 遍历 每个资源 的 依赖数组
        asset.deps.forEach(depPath=>{
            // 获取到 每一项 的 depPath 与 目录 组成 绝对路径 
            const absolutePath = path.join(dirname,depPath)
            // 继续创建 依赖的 资源
            const childAsset = createAsset(absolutePath)
            // 当前资源 的 mapping  { key : 依赖的路径 , value : 依赖的id} 
            asset.mapping[depPath] = childAsset.id
            // 将依赖的 资源 加入 所有资源中 继续向下遍历
            allAssets.push(childAsset)
        })
    }
    //返回 所有资源  也就是 依赖图 是一个数组 里面存放的是 
    // {
    //     id,   当前资源的id
    //     code,   当前资源的代码
    //     deps:[],  当前资源的依赖
    //     mapping:{
    //         ... deps 里面每一项 的path 和 每一项生成的资源的id 的映射
    //     }
    // }
    return allAssets
}


/** 
 *  通过 依赖图  去打包文件
 *
 * @param {*} graph  依赖图 即 所有资源
 */
function bundle(graph){
    //初始化 modules  字符串 
    let modules = ''
    // 遍历 依赖图
    graph.forEach(asset =>{
        modules += `${asset.id} : [
            function(require,module,exports){
                ${asset.code}
            },
            ${JSON.stringify(asset.mapping)}
        ],`
    })
    const res = `(function(modules){
        // 实现 require 方法
        function require(id){
            const [ fn, mapping ] = modules[id]
            function localRequire(path){
                return require(mapping[path])
            }
            const module = { exports:{} }
            fn(localRequire,module,module.exports)
            return module.exports
        }
        require(0)
    })({${modules}})`
    return res 
}
let graph = createGraph('./source/entry.js')
let res = bundle(graph)
fs.writeFileSync('./source/demo.js',res)