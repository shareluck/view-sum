
/**
 * 发布订阅模式
 * 1. 存储所有的观察者  subs = [watchers]
 * 2. 每一个 watcher 都有 update 方法
 * 3. 通知 subs 里面所有的 wathcer 并调用其 update 方法
 * @export
 * @class Dep
 */
export default class Dep{
    constructor(){
        this.subs = []
    }
    /** 添加watcher  */
    addSub(watcher){
        //如果 watcher 存在 且有 update 方法
        if(watcher  && watcher.update) this.subs.push(watcher)
    }
    /** 发送通知  */
    notify(){
        this.subs.forEach(watcher=>{
            watcher.update()
        })
    }
}

//  Dep 在哪里实例化 在哪里 addSub

// Observer 遍历属性的时候 实例化
// notify 在哪里调用