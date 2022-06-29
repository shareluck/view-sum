import Dep from './dep.js';


/**
 * @export
 * @class Observer
 */
export default class Observer{
    constructor(data,vm,methods){
        this.traverse(data)
        this.intiMethods(vm,methods)
    }
    /** 递归遍历所有属性 */
    traverse(data){
        if(!data || typeof data !=='object') return
        Object.keys(data).forEach(key=>{
            this.defineReactive(data,key,data[key])
        })
        
    }
    /** 给传入的数据设置 getter / setter */
    defineReactive(obj,key,val){
        this.traverse(val)
        const dep = new Dep()
        let that = this
        Object.defineProperty(obj,key,{
            enumerable:true,
            configurable:true,
            get (){
                Dep.target && dep.addSub(Dep.target)
                return val
            },
            set (newValue){
                if(newValue === val) return
                val = newValue
                that.traverse(newValue)
                dep.notify()
            },
        })
    }
    intiMethods(vm,methods){
        console.log(vm,methods,123)
        Object.keys(methods).forEach(key=>{
            vm[key] = vm.$methods[key].bind(vm)
        })
    }
}