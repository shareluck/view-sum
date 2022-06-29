# 相关
###  vue 响应式原理
1. vue 3 个核心类
    - Observer 
        给对象的属性添加 getter && setter 用于 **依赖收集** 和 **派发更新**
        - **依赖收集**
            1. initState :对 computed 属性 初始化的时候 触发 computed watcher 依赖收集
            2. initState :对 监听属性 初始化的时候 触发 user watcher 依赖收集
            3. render : 触发 render watcher 依赖收集
        - **派发更新**
            使用 Object.definePropertie
            1. 组件中对响应的数据进行修改 触发 setter 
            2. dep.notify()
            3. 遍历所有的 subs 调用 每一个 watcher 的 update 方法
    - Dep (用于收集当前响应式对象的依赖关系)
        1. 每个响应式对象都有一个 dep实例 
        2. dep.subs = watcher[].
        3. 当数据发生变化时 通过 dep.notify() 通知 subs 里面的所有 watcher
    - Watcher (观察者对象)
        1. render watcher  
        2. computed watcher 
        3. user watcher

**总结**
* 当创建vue 实例时 ,遍历data 里面的属性 通过 Object.definePropertie() 为属性添加 getter 和 setter 进行劫持

2. 计算属性的实现原理  怎么实现的  缓存的意义  定义在data 中的数据才能触发 computed
    - 实现
        * computed watcher 通过传入的lazy 变量 赋值给 dirty 属性 来控制缓存
    - 为什么要有缓存
        * 为了减少比较耗时的过程, 官方建议是制作简单的赋值操作,让 插值表达式看起来更剪短
    - 不是响应式的数据 不能触发 computed

3. nextTick
    - 使用
        ```js
            Vue.nextTick(()=>{
                ...操作
            })
            await Vue.nextTick()
            ...操作
        ```
    - 原理
        * Vue 是异步更新 dom 的 ,观察到数据变化之后, 把同一个 event loop 中 观察数据变化的 watcher 推送进 异步更新队列 ,在下一次时间循环时,清空 该队列 并 更新 dom
        * 优先级 Promise.then > MutationObserver > setImmeidate > setTimeout
        
4. 手写步骤
    * index.html 页面
    * index.js   入口文件 
    * vue.js    ( Vue 类 )  
        - 传入 options ={}

        ```js
            constructor(options={}){}
        ```

        - 初始化 : options data methods  el 等等

        ```js
            constructor(options={}){
                //初始化
                this.$options = options
                this.$data = options.data
                this.$methods = options.methods
                this.$el = options.el
            }
        ```

        - 代理 data : 遍历 data 通过 Object.definePropertie() 设置每一个属性的访问器属性 getter setter 将 data 的每一个属性 放在 vue 实例上

        ```js
            constructor(options={}){
                this._proxyData(this.$data)
            }
            //代理 data
            _proxyData(data){
                Object.keys(data).forEach(key=>{
                    Object.definePropertie(this,key,{
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
        ```

        - 实例化 observer 对象 : 传入 data 递归遍历 data 将每一属性设置为响应式对象 (通过创建 dep 实例 ) 在每一个属性的 getter 上添加 watcher ,setter 上 调用 dep 实例的 notify
        ```js
            constructor(options={}){
                new Observer(this.$data)
            }
        ```

        - 实例化 compiler 对象 : 传入 实例 
        ```js
            constructor(options={}){
                new Observer(this)
            }
        ```
        
    * dep.js   ( 发布订阅模式 )
        - 实现 **收集依赖** 和  **派发更新**  
        - 存储 watcher 的数组 subs 添加 wathcer 的方法 addSub(watcher) 
        ```js
            constructor(){
                this.subs = []
            }
            addSub(watcher){
                this.subs.push(watcher)
            }
        ```
        - 通知 notify(遍历subs 触发每一个watcher 的update 方法)
        ```js
            notify(){
                this.subs.forEach(wathcer => {
                    wathcer.update()
                });
            }
        ```
   
    * watcher.js ( 观察者对象 )
        - (3个参数:vue实例,属性key,更新视图的回调函数cb) 
        - 初始化 : 
            * 给 Dep 添加 target 属性 为当前的 Watcher  
            * 拿到当前 value 
            * 将 Dep 的 target 属性 置空 
            ```js
                constructor(vm,key,cb){
                    this.vm = vm
                    this.key = key
                    this.cb = cb
                    Dep.target = this
                    this.oldValue = this.vm[key]
                    Dep.target = null
                }   
            ```

        - 具有update 方法 观察数据的变化 如果数据变化 执行 cb
            ```js
                update(){
                    let newValue = this.vm[this.key]
                    if(newValue === oldValue) return
                    this.cb(newValue)
                }
            ```

    * observer.js ( 数据劫持 )
        - 传入 data 递归遍历 创建响应式对象
        ```js
            constructor(data){
                this.traverse(data)
            }
            traverse(data){
                if(!data || typeof data !=='object') return
                Object.keys(data).forEach(key => {
                    this.defineReactive(data,key,data[key])
                });
            }
            defineReactive(data,key,value){
                this.traverse(value)
                //实例化Dep
                const dep = new Dep()
                let that = this
                // 设置 getter setter
                Object.defineProperty(obj,key,{
                    enumerable:true,
                    configurable:true,
                    get (){
                        // 收集依赖
                        Dep.target && dep.addSub(Dep.target)
                        return value
                    },
                    set (newValue){
                        if(newValue === value) return
                        value = newValue
                        // 递归响应
                        that.traverse(newValue)
                        // 派发更新
                        dep.notify()
                    },
                }) 
            }
        ```

    * compiler.js
        - 传入 vm 实例 
        ```js
            constructor(vm){
                
                compile(vm.$el)
            }
            compile(el){
                // 1. 获取子节点  (类数组)
                const childNodes = el.childNodes
                // 2. 遍历子节点数组
                Array.from(childNodes).forEach(childNode => {
                    // 3. 判断数组类型 childNode.nodeType === ? 
                    /**
                     *  如果是元素节点 通过 正则 拿到 模版字符串中的属性 将内容替换
                     如果是 元素节点 拿到 节点的 属性 attributes (类数组)
                     遍历拿到指令 做相应的操作  操作中 实例化 Watcher 如果是v-model  或者 事件 v-on事件 需要添加监听器
                     实例化Watcher
                     */
                    if(childNode.nodeType ===3){
                        // 操作
                        new Watcher(this.vm,key,(newValue)=>{
                            childNode.textContent = newValue
                        })
                    }
                    
                    // 4. 子节点是否还有子节点 递归调用 compile
                    if(childNode.childNodes && childNode.childNodes.length>0){
                        this.compile(childNode)
                    }
                });
            }
        ```
    