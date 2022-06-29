## instanceOf 实现  左边的原型链上存不存在右边的原型 
```js
function myInstanceOf(l,r){
    //右边必须是函数
    if(typeof r !== 'function' || !r.prototype) throw new Error('11111')
    //左边 是null或者原始类型
    if(l ===null  || ( typeof l !=='object'  && typeof l !=='function')) return false
    while(l.__proto__){
        if(l.__proto__ === r.prototype) return true
        l = l.__proto__
    }
    return false
}
```

## 拷贝的实现
### 浅  只拷贝一层 深层的引用类型数据引用的还是同一指针
1. 赋值  Object.assign()  ...
```js
    let a = {
        a:[1,2,3]
    }
    // let b = a  赋值
    // let b = Object.assign({},a)  Object.assign()
    // let b = {...a}  ...
    //改变对象中引用类型的值 均改变
    a.a[0]= 3 
    console.log(a,b)
```

### 深  拷贝所有层 并且对引用类型数据 开辟新的空间 互不干扰
1. JSON.parse(JSON.stringify(待拷贝对象)) 
    - 会忽略 函数 undefined  symbol 
    - NaN、Infinity、-Infinity 会被序列化为 null 
    - 如果有循环引用会报错
2. 递归
    - 递归遍历引用数据    
    - 处理 null 日期 正则 等    instanceOf
    - 分开 初始化 数组 和 对象   constructor
    - 处理symbol              Reflect.ownKeys()
    - 处理循环引用              WeakMap
```js
function deepClone(target,hash = new WeakMap()){
    if (target === null) return target // 处理 null
    if( target instanceof Date)return  new Date(target) //处理日期
    if( target instanceof RegExp)return  new RegExp(target)  //处理正则
    if(hash.has(target)) return hash.get(target) //处理 循环引用
    if(typeof target !== 'object') return target //处理原始类型
    let res = new target.constructor()  //初始化 数组 或者 对象 
    hash.set(target, res) //处理 循环引用
    Reflect.ownKeys(target).forEach( key => res[key] = deepClone(target[key],hash)) // 处理 symbol
    return res
}

```



## json 序列化的实现

## 函数柯里化 实现
1. 获取原函数参数长度
2. 定义私有变量存储 每次传入的参数
3. 定义返回函数
4. 返回函数的参数 为新传入的参数 更新 所有参数数组
5. 判断 所有参数数组 与原函数参数 长度 
6. 根据结果返回  原函数直接执行的结果 还是 返回函数
```js
function fnCurry(fn,...args){
    // 原函数参数的长度  fn.length 获取
    let originalFnArgsLength = fn.length
    // 私有变量 存储所有的参数
    let allArgs = [...args]
    // 定义 返回函数
    const resFn = (...newArgs) =>{
        // 更新 所有参数 展开符 已经有的和新传入的参数
        allArgs = [...allArgs,...newArgs]
        // 比较 所有参数与 原函数 参数个数
        if(allArgs.length >= originalFnArgsLength){
            // 已经传入所有参数了  直接调用 fn 
            return fn(...allArgs.slice(0,originalFnArgsLength))
        }else{
            // 没有传入 继续调用 闭包函数
            return resFn
        }
    }
    return resFn
}

function sum(a,b,c){
    return a+b+c
}
```

## 数组 reduce 实现

## new 的实现
```js
    function myNew(F){
        //创建一个对象
        let obj = {}
        obj.__proto__ = F.prototype
        let args = [...arguments]
        F.apply(obj,args.slice(1))
        return obj
    }

    function F(name,age){
        this.name = name
        this.age = age
    }
    F.prototype.eat = function(){
        console.log('eeeeeeee')
    }
    let f = new F('1','1')
    let f1 = myNew(F,'2','2')
    console.log(f,f1)
    f.eat()
    f1.eat()
```
## bind call apply 实现


## 可迭代对象的实现   [Symbol.iterator]
```js
    let obj = {
        count :0 ,
        [Symbol.iterator]:()=>{
            return {
                next: ()=>{
                    obj.count ++
                    if(obj.count >10){
                        return {
                            value:undefined,
                            done:true
                        }
                    }else{
                        return {
                            value:obj.count,
                            done:false
                        }
                    }
                }
            }
        }
    }
    for(let it of obj){
        console.log(it)
    }
```


## setTimeOut 实现 setInterval
```js
    let timer = null
    // 创建
    function myTimerInterval(fn,space,...args){
        const recur = function(){
            timer = setTimeout(()=>{
                fn.apply(this,args)
                recur()
            },space)
        }
        recur()
    }
    // /清除
    function myClearInterval(id){
        clearTimeout(id)
    }
    //执行
    myTimerInterval((a,b,c)=>{
        console.log(a,b,c)
    },1000,1,2,3)
    setTimeout(() => {
        myClearInterval(timer)
    }, 5000);
```

## 防抖 和节流  debounce throttle
### 防抖 debounce  eg input 输入时间
```js
    function debounce(fn,wait){
        let timer = null
        return function(){
            clearTimeout(timer)
            timer = setTimeout(()=>{
                fn.apply(this,arguments)
            },wait)
        }
    }
```
### 节流 throttle  scroll resize  事件
```js
    // 第一次会触发  最后一次不会触发  首节流
    function throttle(fn,delay){
        let last = 0 
        return function(){
            let now = Date.now()
            if(now - last >= delay){
                fn.applu(this,arguments)
                last = now 
            }
        }
    }
    // 尾节流 触发最后一次
    function throttle(fn,delay){
        let timer = null
        return function(){
            if(!timer){
                timer = setTimeout(() => {
                    fn.apply(this,arguments)
                    timer = null
                }, delay);
            }
            
        }
    }
    //终极版本
    function throttle(fn,delay){
        let last = 0
        let timer = null
        return function(){
            let now = Date.now()
            let remain = delay - now + last 
            clearTimeout(timer)
            if(remain<=0){
                fn.apply(this,arguments)
                last = now 
            }else{
                timer = setTimeout(() => {
                    fn.apply(this,arguments)
                    last = now 
                }, remain);
            }
        }
    }
```



## 对象继承的实现
1. 原型链   子类构造函数的原型指向 父类构造函数的实例 无法传参 引用类型数据互相影响
2. 构造函数模式  子类构造函数内 使用 父类构造函数 方法不能复用
3. 组合模式  原型链继承 方法  构造函数继承属性  调用了 两次 父类构造函数
4. 原型 将对象作为 构造函数的原型
5. 寄生模式 封装函数  克隆 父类构造函数的原型对象 增强该对象 指定该对象为子类构造函数的原型   注意 constructor 的设置 要是原型链闭环
6. 组合寄生模式  组合模式+ 寄生模式  解决了组合模式 调用两次父类构造函数的缺陷

## promise.all 的实现
```js
    //1. promise.all 是静态方法
    function promiseAll(promiseList){
        //2.返回promise
        return new Promise((resolve,reject)=>{
            // 3.参数类型判断
            if(!Array.isArray(promiseList)){
                return reject(new TypeError('参数必须是数组'))
            }
            //4.定义所有结果数组 和 计数
            let promiseRes = []
            let count = 0
            //5. 遍历调用promise.resolve() 返回promise
            for (const key in promiseList) {
                Promise.resolve(promiseList[key]).then((val)=>{
                    count ++ 
                    // 所有结果 赋值
                    promiseRes[key] = val
                    //判断 是否所有 promise 均成功
                    if(count === promiseList.length){
                        resolve(promiseRes)
                    }
                }).catch(e=>{
                    //错误返回
                    reject(e)
                })
            }
        })
    }
```