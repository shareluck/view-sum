/** 
 * 包括 vue 的类
 * 以及 配置 和参数
 * 
*/




import Observer from './observer.js';
import Compiler from './compiler.js';
export default class Vue{
    //传入 options 参数 初始值为{}
    constructor(options={}){
        //为 Vue 的私有变量赋值
        this.$options = options
        this.$data = options.data
        this.$methods = options.methods
        //初始化 dom
        this.initEl(options)
        //代理data 里面的数据 绑定到 vue 实例上
        this._proxyData(this.$data)

        // 实例化 observer 对象 监听数据变化
        new Observer(this.$data,this,this.$methods)
        // 实例化 Compiler 对象 解析 指令 和 {{}}
        new Compiler(this)
    }
    /**
     *  获取元素 并存储到 vue 实例中 
     *  检查传入的 el 是否合规
     *
     * @param {*} options
     * @memberof Vue
     */
    initEl(options){
        
        if(typeof options.el ==='string'){
            this.$el = document.querySelector(options.el)
        }else if(options.el instanceof HTMLElement){
            this.$el = options.el
        }
        if(!this.$el){
            throw new Error('传入的 el 不合法,请传入dom/dom的选择器')
        }
    }

    _proxyData(data){
        Object.keys(data).forEach(key=>{
            Object.defineProperty(this,key,{
                enumerable:true,
                configurable:true,
                get (){
                    return data[key]
                },
                set (newValue){
                    if(data[key] === newValue) return 
                    data[key] = newValue
                }
            })
        })
    }
}
    