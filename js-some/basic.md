# js 基础部分
## 数据类型
### js 一共有 8中数据类型
- Undefined
- Null 
- Number 
- String
- Boolean
- Symbol
- BigInt
- Object

### 原始 存放在栈中
- Undefined
- Null 
- Number 
- String
- Boolean
- Symbol
- BigInt

### 引用 存放在堆中 栈中存放指向堆中的指针
- Object 
    - object
    - array
    - function
    - date 
    - 正则 等等

## 检测数据类型的方式
### typeOf   
- 返回数据类型
    - null 空对象 数组 都会返回 object
    - NaN  Number
### instanceof  
- 返回 布尔值  （是否是某一数据类型）
    - 不能检测原始数据类型
### constructor 
    - 实例的constructor 指向实例的构造函数
### Object.prototype.toString.call().slice(8,-1)


## 隐式转换规则
### 引用类型的值 转换为 基础（原始）类型的值
```js
function toPrimitive(obj,type){
    //obj :要转换的对象 
    // type : 转换成什么类型
    //type 为 String 或者 Number
    String 先 toString 后 valueOf
    Number 先 valueOf  后 toString
    //可以自行修改原型上的 这 2个方法
}
```

## 深拷贝
```js
    
```


## 创建对象的方式 
### 工厂模式 后面给构造函数模式替代
- 函数内 新建对象 设置对象的 属性 和方法 返回
- 不知道 对象的类型 只知道是对象
```js
    function createObj(name){
        let o = new Object()
        o.name = name
        o.fn = function(){
            console.log(this.name)
        }
        return o
    }
    let obj1 = createObj('obj1')
    let obj2 = createObj('obj2')
```

### 构造函数模式 
- 使用 new 操作符
- new 做了什么
    - 新建一个对象   
    - 将构造函数的作用域与赋给新对象
    - 执行构造函数的方法
    - 返回新对象
- 创建的实例 都是 Person
```js
    function Person(name){
        this.name = name 
        this.fn = function(){
            console.log(this.name)
        }
    }
    let obj1 = new Person('obj1')
    let obj2 = new Person('obj2')
```

### 原型模式
- 将属性 和方法 放在 构造函数的原型上 
- 所有实例的属性和方法 取的都是原型上的 所以 相等
```js
    function Person(){
        
    }
     Person.prototype.name = 'obj'
     Person.prototype.fn = function(){
        console.log(this.name)
    }
    let obj1 = new Person()
    let obj2 = new Person()
```


### 组合模式 （原型模式+构造函数模式）
- 构造函数 里面 放 私有属性
- 构造函数的原型里面 放 公共的属性和方法
```js
    function Person(name){
        this.name = name
    }
    Person.prototype = {
        constructor:Person,
        fn:function(){
            console.log(this.name)
        }
    }
    let obj1 = new Person('obj1')
    let obj2 = new Person('obj2')
```





## 继承
1. 原型链 ：
    - 原理：子类构造函数 的原型 设置为 父类构造函数 的 实例
    - 缺点：无法传参 父类实例有引用数据类型
2. 构造函数
    - 原理：子类构造函数 中 调用父类构造函数 
    - 缺点：方法不能复用
3. 组合式：
    - 原理：原型链 继承 属性  构造函数继承 方法
    - 缺点：会调用两次父类构造函数 第一次是设置子类构造函数的原型 第二次是创建子类实例时调用
4. 原型式：
    - 原理：创建对象 增强对象 返回对象
    - 缺点：引用类型的数据 和 方法不能复用
5. 寄生式：
    - 原理：创建对象 增强对象 指定对象
    - 缺点：引用类型的数据 和 方法不能复用
6. 寄生组合式：
    - 原理：将 组合式 的 子类构造函数 指定 父类实例 改为了 指定 父类原型的浅拷贝并增强
    - 注意：保持原型链的完整 子类的原型的  constructor  指向子类
### 原型链 
- 子类构造函数的原型 指向 父类构造函数的 实例
- 缺点：
    - 实例作为原型的时候可能会有引用类型的数据
    - 无法通过子构造函数向父构造函数传参
```js
    function P(name,job){
        this.name = name
        this.job = job
    }
    P.prototype = {
        constructor:P,
        fn:function(){
            console.log(this.job)
        }
    }
    function C(name){
        this.name = name
    }
    C.prototype = new P('name1','job1')
    new C().fn()
```


### 构造函数
- 子类构造函数 中 引用 父类构造函数 
- 缺点：
    - 只借用构造函数 的话 方法 也都需要放在构造函数中 不能实现复用
```js
    function P(arr){
        this.arr= arr
    }
    P.prototype = {
        constructor:P,
        fn:function(){
            console.log(this.arr)
        }
    }
    function C(){
        P.call(this,...arguments)
    }
    C.prototype = new P()
```

### 组合模式
- 原型链模式继承 方法  构造函数模式继承 属性 
- 缺点：
    - 会调用两次 父类构造函数 使 子类实例 的原型上也有一份父类构造函数的属性
```js
    function P(name,arr){
        this.name = name
        this.arr= arr
    }
    P.prototype = {
        constructor:P,
        fn:function(){
            console.log(this.arr)
        }
    }
    function C(){
        P.call(this,...arguments)
    }
    C.prototype = new P()
    C.prototype.sayName = function(){
        console.log(this.name)
    }
```

### 原型式继承
- 封装一个方法  传入一个对象 新建一个构造函数 将构造函数的原型指向 传入的对象 返回 构造函数的实例 
-  缺点：
    - 引用类型数据 还是共享了
```js
    // 没规范化之前
    function object(obj){
        function F(){}
        F.prototype = obj
        return new F()
    }
    //规范化之后  可以使用 Object.create() 代替
```


### 寄生式继承
- 创建一个仅用于 封装 继承过程的函数 函数内部 增强对象 最后返回对象
- 缺点：
    - 方法不能复用
```js
    //创建对象方法
    function object(obj){
        function F(){}
        F.prototype = obj
        return new F()
    }
    function extend(old){
        //创建
        let clone = object.create(old)
        // let clone = object(old)
        //增强
        clone.newFn = function(){
            console.log(111)
        }
        //返回
        return clone 
    }
```

### 寄生式组合继承
- 让 子类构造函数 的原型 直接等于父类的原型 减少了 组合模式第一次 指定原型调用父类构造函数
```js
    function Parent(name,arr){
        this.name = name
        this.arr = arr
    }
    Parent.prototype.sayName = function(){
        console.log(this.name)
    }
    function Child(){
        Parent.call(this,...arguments)
    }
    extend(Parent,Child)
    function extend(parent,child){
        let clone =Object.create(parent.prototype)
        clone.constructor = child
        child.prototype = clone 
    }
    let a = new Child('childName')
    a.sayName()
```







## 改变 this 指向
### bind call apply 
- 区别：
1. 返回区别 ：
    - bind 返回 函数 并且可以 断点续传
    - call apply 返回结果
2. 传参区别 ：
    - apply bind 是数组
    - call 是按顺序传入



## 闭包
- 指能访问其他函数作用域中的变量的函数
```js
    function a(){
        let name = 'aaa'
        return function(){
        }
    }
    a()()
```