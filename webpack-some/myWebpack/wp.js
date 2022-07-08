const fs = require('fs');
const path = require('path');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const babel = require('babel-core');
let ID = 0
function createAsset(filePath){
    const content = fs.readFileSync(filePath,'utf-8')
    const ast = babylon.parse(content,{
        sourceType:'module'
    })
    const depPaths = []
    traverse(ast,{
        ImportDeclaration :({
            node
        }) =>{
            depPaths.push(node.source.value)
        }
    })
    const id = ID++
    const { code } = babel.transformFromAst(ast,null,{
        presets:['env']
    })
    return {
        id,
        depPaths,
        filePath,
        code
    }
}


function  createGraph(rootPath) {
    const asset = createAsset(rootPath)

    const allAssets = [asset]

    for (const asset of allAssets) {
        const dirname = path.dirname(asset.filePath)
        asset.mapping = {}
        asset.depPaths.forEach(depPath=>{
            const absPath = path.join(dirname,depPath)
            
            const childAsset = createAsset(absPath)
            asset.mapping[depPath] = childAsset.id
            allAssets.push(childAsset)
        })
    }
    return allAssets
}

function bundle(graph) {
    let modules = ''

    graph.forEach(asset=>{
        modules += `${asset.id}:[
            function(require,module,exports){
                ${asset.code}
            },
            ${JSON.stringify(asset.mapping)}
        ],`
    })

    let  res = `(function(modules){
        function require(id){
            const [ fn, mapping ] = modules[id]
            function localRequire(path){
                return require(mapping[path])
            }
            const module = { exports :{} }
            fn(localRequire,module,module.exports)
            return module.exports
        }
        require(0)
    })({${modules}})`
    return res 
}

let graph = createGraph('./source/entry.js')
let res = bundle(graph)
console.log(res)