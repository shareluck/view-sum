import Watcher from "./watcher.js"

export default class Compiler {
    constructor(vm){
        this.el = vm.$el
        this.vm = vm
        this.methods = vm.$methods
        this.compile(this.el)
    }
    /** 编译模版 */
    compile(el){
        const childNodes = el.childNodes  //类数组
        Array.from(childNodes).forEach(node => {
            
            if(this.isTextNode(node)){
                //文本节点
                this.compileTextNode(node)
            }else if(this.isElementNode(node)){
                //元素节点
                this.compileElementNode(node)
            }

            //子节点  递归嗲用compile
            if(node.childNodes && node.childNodes.length>0){
                this.compile(node)
            }
        });

    }
    /** 是否文本节点 */
    isTextNode(node){
        return node.nodeType ===3 
    }
    /** 是否元素节点 */
    isElementNode(node){
        return node.nodeType ===1 
    }
    /** 编译文本节点 */
    compileTextNode(node){
        // node: {{ msg }}   msg:'1111'
        const reg = /\{\{(.+?)\}\}/
        const nodeValue = node.textContent  
        if(reg.test(nodeValue)){
            const key = RegExp.$1.trim() // 拿到了 {{ msg }}  中的 msg
            node.textContent = nodeValue.replace(reg,this.vm[key])

            new Watcher(this.vm,key,(newValue)=>{
                node.textContent = newValue
            })
        }
    }
    /** 编译元素节点 */
    compileElementNode(node){
        let attrs = node.attributes  //类数组
        if(attrs.length){
            Array.from(attrs).forEach(attr=>{
                const attrName = attr.name //指令 v-model v-html  v-on:click v-text 等 
                if(this.isDirective(attrName)){
                    let directiveName = attrName.indexOf(':') > -1 ? attrName.substr(5) :  attrName.substr(2)
                    let key = attr.value  // msg
                    this.update(node,key,directiveName)
                } 
            })
        }
    }
    /** 是否是 v- 开头 的指令 */
    isDirective(attrName){
        return attrName.startsWith('v-')
    }
    /** 触发更行函数 */
    update(node,key,directiveName){
        // v-model v-html  v-on:click v-text 等 
        const fn = this[directiveName+'Update']
        fn && fn.call(this,node,this.vm[key],key,directiveName)
    }
    textUpdate(node,value,key){
        node.textContent = value
        new Watcher(this.vm,key,(newValue)=>{
            node.textContent = newValue
        })
    }
    htmlUpdate(node,value,key){
        node.innerHTML = value
        new Watcher(this.vm,key,(newValue)=>{
            node.innerHTML = newValue
        }) 
    }
    
    modelUpdate(node,value,key){
        node.value = value
        new Watcher(this.vm,key,(newValue)=>{
            console.log(newValue,123)
            node.value = newValue
        }) 
        node.addEventListener('input',()=>{
            this.vm[key] = node.value
        })
    }
    clickUpdate(node,value,key,directiveName){
        node.addEventListener(directiveName,this.vm[key])
    }
}