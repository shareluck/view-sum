# js 相关

## js 的数据类型
### 基础数据类型 
- number 
```
    代表整数和浮点数。

    数字可以有很多操作，比如，乘法 *、除法 /、加法 +、减法 - 等等。

    除了常规的数字，还包括所谓的“特殊数值（“special numeric values”）”也属于这种类型：Infinity、-Infinity 和 NaN。

    Infinity 代表数学概念中的 无穷大 ∞。是一个比任何数字都大的特殊值。
    Infinity == 1/ 0

    NaN 代表一个计算错误。它是一个不正确的或者一个未定义的数学操作所得到的结果.
    1 / 'abc' == NaN
```
   
- string
```
    单引号 : 'abc' 
    双引号 : 'abc'
    模版字符串 : `abc${使用的变量}`
```
- boolean true false
- undefined  只有 undefined  代表未定义
- null 只有 null  代表 空指针或者不存在
- symbol Symbol()
- bigInt 大数 末尾添加 n  11111111111111111111111111111111n


### 引用数据类型
- object  数组 对象  函数  正则  日期 等



### 判断类型

#### typeof  null 为 
```js
typeof undefined // "undefined"

typeof 0 // "number"

typeof 10n // "bigint"

typeof true // "boolean"

typeof "foo" // "string"

typeof Symbol("id") // "symbol"

typeof Math // "object"  (1)

typeof null // "object"  (2)

typeof alert // "function"  (3)
```


### 类型转换
1. string 转换   String()

2. number 转换   Number()
```js
    undefined	NaN
    null	0
    true 和 false	1 and 0
    string	去掉首尾空格后的纯数字字符串中含有的数字。如果剩余字符串为空，则转换结果为 0。否则，将会从剩余字符串中“读取”数字。当类型转换出现 error 时返回 NaN。
```

3. boolean 转换 Boolean()
```js
0, null, undefined, NaN, ""	false
其他值	true
```
4. 对象 转换成原始类型*
    调用 obj[Symbol.toPrimitive](hint) 如果这个方法存在，
    否则，如果 hint 是 "string"
    尝试调用 obj.toString() 或 obj.valueOf()，无论哪个存在。
    否则，如果 hint 是 "number" 或者 "default"
    尝试调用 obj.valueOf() 或 obj.toString()，无论哪个存在。

### 类型方法
1. number
- 要写有很多零的数字：
将 "e" 和 0 的数量附加到数字后。就像：123e6 与 123 后面接 6 个 0 相同。
"e" 后面的负数将使数字除以 1 后面接着给定数量的零的数字。例如 123e-6 表示 0.000123（123 的百万分之一）。
对于不同的数字系统：

- 可以直接在十六进制（0x），八进制（0o）和二进制（0b）系统中写入数字。
parseInt(str，base) 将字符串 str 解析为在给定的 base 数字系统中的整数，2 ≤ base ≤ 36。
- num.toString(base) 将数字转换为在给定的 base 数字系统中的字符串。
要将 12pt 和 100px 之类的值转换为数字：

- 使用 parseInt/parseFloat 进行“软”转换，它从字符串中读取数字，然后返回在发生 error 前可以读取到的值。
小数：

- 使用 Math.floor，Math.ceil，Math.trunc，Math.round 或 num.toFixed(precision) 进行舍入。
请确保记住使用小数时会损失精度。

- 更多数学函数： 需要时请查看 Math 对象。这个库很小，但是可以满足基本的需求。


2. string
[字符串方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String#methods)

3. array (增 删 改 查 拼 赋 排 转)
- 增
    - 后增 push
    - 前增 unshift
- 删
    - splice 
    - slice 





## 函数 function

### 创建方式
1. 函数声明 
- 会有提升  随便哪里调用
```js
sayHi("John"); // Hello, John
function sayHi(name) {
  alert( `Hello, ${name}` );
}
```

2. 函数表达式
- 不会有提升  调用要放在后面
```js
sayHi("John"); // error!

let sayHi = function(name) {  // (*) no magic any more
  alert( `Hello, ${name}` );
};
```


### 函数的内置参数  
- this 指向调用函数的对象
- arguments  函数的所有参数 （类数组 可迭代 没有数组的方法）
```js
sayHi("John"); // Hello, John
function sayHi(name) {
    console.log(this,arguments)
    for(let i = 0 ;i <arguments.length;i++){
        console.log(arguments[i])
    }
}
```


### 函数的递归
- 当一个函数进行嵌套调用时，将发生以下的事儿：
当前函数被暂停；
与它关联的执行上下文被一个叫做 执行上下文堆栈 的特殊数据结构保存；
执行嵌套调用；
嵌套调用结束后，从堆栈中恢复之前的执行上下文，并从停止的位置恢复外部函数。


### 闭包 
- 理解： 可以访问 自由变量（不是函数的参数也不是函数的内部变量）的函数 
- 应用 函数柯里化
```js
    //原函数
    function fn(a,b)(
        return a+b
    )
    //柯里化函数
    function fnCurry(a){
        return function(b){
            console.log(a+b)
            return a+b
        }
    }
    let b = a(1)
    b(1)
    b(12)
    b(2)
    b(4)
```
- 创建私有变量/函数  可以用来做缓存
```js
    function a(){
        let num = 0
        return function(){
            num++
            console.log(num)
            return num
        }
    }
    let b = a()
    b()
    b()
    b()
    b()
```


### 装饰器  
- 通过某种方式 对函数进行装饰 并返回函数  比如缓存
- es6 之前装饰器 返回的函数 会丢失函数属性  es6 之后 Reflect  可以不丢失

## 对象 object   {key(自动转为字符串) : value}
### 创建对象
1. 构造函数 
```js
let a = new Object({1:1})
```
2. 字面量 
```js
let a = {
    name:'111' 
}
```

### 遍历对象
1. for key in object 

2. Object.keys()

3. Object.values()

4. for key of obj
要使用 [Symbol.iterator] 迭代器 将对象设置为可迭代  
[iterator 迭代器](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_Generators)
```js
    let range = {
        from: 1,
        to: 5
    };

    // 1. for..of 调用首先会调用这个：
    range[Symbol.iterator] = function() {

        // ……它返回迭代器对象（iterator object）：
        // 2. 接下来，for..of 仅与下面的迭代器对象一起工作，要求它提供下一个值
        return {
            current: this.from,
            last: this.to,

            // 3. next() 在 for..of 的每一轮循环迭代中被调用
            next() {
            // 4. 它将会返回 {done:.., value :...} 格式的对象
            if (this.current <= this.last) {
                return { done: false, value: this.current++ };
            } else {
                return { done: true };
            }
            }
        };
        };
    // 现在它可以运行了！
    for (let num of range) {
        alert(num); // 1, 然后是 2, 3, 4, 5
    }
```

### 引用和复制
1. 对象是引用类型 存储的是指针 指向 该对象在内存中的地址 
```js
// a 指向 内存中的 {name:1}
let a = {name:1}
// b 指向 内存中的 {name:1}
let b = a
// 改变 b 的 值 
b.name =2
// a 也改变了
alert(a.name)  //2
alert(a === b)  //true
```

2. 拷贝 

```js
// a 指向 内存中的 {name:1}
let a = {name:1}
let b = {}
// 1. 通过遍历对象的方式
// for (const key in a) {
//     b[key] = a[key]
// }
// 2. 通过 Object.assign(obj(新对象),obj(要复制的对象可以很多个))
// Object.assign(b,a)
// 3.通过es6 展开符 ...
// b = {...a}
// 4.Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));  可以复制对象 key 为Symbol 的 属性
// b 指向另外一个 {name:1}
b.name = 2
alert(a.name)  //1
alert(a === b)  //false
```

### 对象的属性和属性描述符
1. 数据属性 
    - 数据属性描述符
        1. value :当前值
        2. writable : 是否可写
        3. enumerable : 是否可枚举
        4. configurable : 是否可删除
```js
    let obj = {
        a:1 ,
        b:function(){}   
    }
    
```
2. 访问器属性 
    - 访问器属性描述符
        1. get : 获取属性值
        2. set : 设置属性值
        3. enumerable : 是否可枚举
        4. configurable : 是否可删除
```js
    let obj = {
        get a(){
            return 'aaaa'
        } 
    }
```
3. 获取属性描述符的方法
- Object.getOwnPropertyDescriptors(obj)
- Object.getOwnPropertyDescriptor(obj,'属性名')

3. 修改属性描述符的方法
- Object.defineProperties(obj,{'属性名1':{描述符对象},'属性名2':{描述符对象},})
- Object.definePropertie(obj,'属性名',{描述符对象})

## Map Set WeakMap  WeakSet
1. Map —— 是一个带键的数据项的集合。
- new Map([iterable]) —— 创建 map，可选择带有 [key,value] 对的 iterable（例如数组）来进行初始化。
- map.set(key, value) —— 根据键存储值，返回 map 自身。
- map.get(key) —— 根据键来返回值，如果 map 中不存在对应的 key，则返回 undefined。
- map.has(key) —— 如果 key 存在则返回 true，否则返回 false。
- map.delete(key) —— 删除指定键对应的值，如果在调用时 key 存在，则返回 true，否则返回 false。
- map.clear() —— 清空 map 。
- map.size —— 返回当前元素个数。
- 与普通对象 Object 的不同点：
    - 任何键、对象都可以作为键。
    - 有其他的便捷方法，如 size 属性。


2. Set —— 是一组唯一值的集合。
- new Set([iterable]) —— 创建 set，可选择带有 iterable（例如数组）来进行初始化。
- set.add(value) —— 添加一个值（如果 value 存在则不做任何修改），返回 set 本身。
- set.delete(value) —— 删除值，如果 value 在这个方法调用的时候存在则返回 true ，否则返回 false。
- set.has(value) —— 如果 value 在 set 中，返回 true，否则返回 false。
- set.clear() —— 清空 set。
- set.size —— 元素的个数。

3. 注意：在 Map 和 Set 中迭代总是按照值插入的顺序进行的，所以我们不能说这些集合是无序的，但是我们不能对元素进行重新排序，也不能直接按其编号来获取元素。

4. WeakMap key  只能是对象 WeakSet 只能存储对象 且是弱引用  当对象没有其他引用的时候 会被gc(垃圾收集)清除   弱集合 没有 clear size 等方法 且不可迭代



## 计时器 setTimeout setInterval （宏任务）
### 概念 用法
- setTimeout(func, delay, ...args) 和 setInterval(func, delay, ...args) 方法允许我们在 delay 毫秒之后运行 func 一次或以 delay 毫秒为时间间隔周期性运行 func。
- 要取消函数的执行，我们应该调用 clearInterval/clearTimeout，并将 setInterval/setTimeout 返回的值作为入参传入。
- 嵌套的 setTimeout 比 setInterval 用起来更加灵活，允许我们更精确地设置两次执行之间的时间。
- 零延时调度 setTimeout(func, 0)（与 setTimeout(func) 相同）用来调度需要尽快执行的调用，但是会在当前脚本执行完成后进行调用。
- 浏览器会将 setTimeout 或 setInterval 的五层或更多层嵌套调用（调用五次之后）的最小延时限制在 4ms。这是历史遗留问题。





## Promise
- 异步执行的规范
- 状态 ： pending fulfiled rejected
- 可链式调用


## Class 类
1. 语法
```js
class MyClass {
    prop = value; // 类属性 
    _prop = value; ///受保护的属性 实例能访问 不能改变  
    #prop = value; ///私有的属性 实例不能访问 
    constructor(...) { // 构造器
        // ...
    }

    method(...) {} // method

    get something(...) {} // getter 方法
    set something(...) {} // setter 方法

    [Symbol.iterator]() {} // 有计算名称（computed name）的方法（此处为 symbol）
    // ...
}
```

2. 继承   extends关键字 super()
- 继承类的constructor 在使用this 前必须调用super()
- 
```js
    class Person{
        constructor(name,age){
            this.name = name
            this.age = age
        }
        introduce(){
            console.log(`my name is ${this.name},and i am ${this.age} years old`)
        }
        showA(){
            console.log(this.a)
        }
    }
    class Student extends Person{
        constructor(name,age,a){
            super(name,age)
            this.a = a
        }
        study(){
            console.log(`i am studying now`)
        }
        showA(){
            console.log(this.a)
        }
    }
    let s1 = new Student('aaa',20,'111')
    s1.study()
    s1.introduce()
    s1.showA()
    console.log(s1)
```

3. 内建类  不能继承 静态方法
```js
class Array1 extends Array{
    isEmpty(){
        return this.length===0
    }
}
let a = new Array1(1,2,3)
```