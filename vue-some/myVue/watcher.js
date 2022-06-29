
import Dep from "./dep.js";
export default class Watcher{
    /**
     * Creates an instance of Watcher.
     * @param {*} vm  vue 实例
     * @param {*} key  data 中的属性名
     * @param {*} cb   更新视图的回调函数
     * @memberof Watcher
     */
    constructor(vm, key, cb){
        this.vm = vm
        this.key = key
        this.cb = cb


        Dep.target = this   // 获取oldvalue 之前 为什么要有这一步 ?


        this.oldValue = vm[key]  //oldvalue 就是当前传入的 实例的key 值


        Dep.target = null // 获取oldvalue 之后 为什么要有这一步 ?

    }
    /** 更新视图 在 Dep 的 notify 里执行 */
    update(){
        let newValue = this.vm[this.key]  //传入新的key 获得新的value
        if(this.oldValue === newValue){
            return 
        } 
        this.cb(newValue)  // 执行更新视图方法
    }
}