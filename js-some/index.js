/**
 * 实现深拷贝
 *
 * @param {*} obj  待拷贝对象
 * @param {*} [hash=new WeakMap()]  解决 循环引用的 缓存
 * @return {*} 
 */
function deepClone(obj, hash = new WeakMap()) {
    if (obj === null) return null
    if (typeof (obj) !== 'object') return obj
    if (obj instanceof Date) return new Date(obj)
    if (obj instanceof RegExp) return new RegExp(obj)
    if (hash.has(obj)) return hash.get(obj)
    let res = new obj.constructor()
    hash.set(obj, res)
    Reflect.ownKeys(obj).forEach(it => res[it] = deepClone(obj[it], hash))
    return res
}
//待拷贝对象
let obj = {
    0: 1,
    1: 'sss',
    2: new Date(),
    3: null,
    4: undefined,
    5: new RegExp(/^sssss/),
    6: function () { },
    7: {
        1: [1, 2, 3],
        2: { 1: 1 }
    },
    8: [1, 2, [12, 421, 5]],
}
// 设置键为symbol
let s = Symbol('111')
obj[s] = 11111
//设置循环引用
obj.a = obj
obj.b = obj.a
//应用
let a = deepClone(obj)
console.log(a)



/**
 * 实现instanceOf
 *
 * @param {*} l 左边的值
 * @param {*} r 右边的构造函数
 * @return {*} 
 */
function myInstanceOf(l, r) {
    //右边必须是函数
    if (typeof r !== 'function' || !r.prototype) throw new Error('11111')
    //左边 是null或者原始类型
    if (l === null || (typeof l !== 'object' && typeof l !== 'function')) return false
    while (l.__proto__) {
        if (l.__proto__ === r.prototype) return true
        l = l.__proto__
    }
    return false
}


console.log(myInstanceOf(null, Object))
console.log(myInstanceOf(function a() { }, Function))
console.log(myInstanceOf(function a() { }, Object))
console.log(myInstanceOf([], Array))
console.log(myInstanceOf([], Object))



/**
 *  实现柯理化
 *
 * @param {*} fn  待柯理化的函数
 * @param {*} args 原函数参数
 * @return {*} 
 */
function curry(fn, ...args) {
    let originLen = fn.length
    let allArgs = [...args]
    const recur = function (...newArgs) {
        allArgs = [...allArgs, ...newArgs]
        if (allArgs.length >= originLen) {
            return fn(...allArgs.slice(0, originLen))
        } else {
            return recur
        }
    }
    return recur
}
function sum(a, b, c) {
    return a + b + c
}

let sum1 = curry(sum, 1)
let sum2 = sum1(2)
let sum3 = sum2(2)
console.log(sum1, sum2, sum3)



/**
 * 实现 new
 *
 * @param {*} F 构造函数
 * @return {*} 返回实例
 */
function myNew(F) {
    let obj = Object.assign({})
    obj.__proto__ = F.prototype
    let args = [...arguments]
    F.apply(obj, args.slice(1))
    return obj
}

function F(name, age) {
    this.name = name
    this.age = age
}
F.prototype.eat = function () {
    console.log('eeeeeeee')
}
let f = new F('1', '1')
let f1 = myNew(F, '2', '2')
console.log(f, f1)
f.eat()
f1.eat()



/**
 * 可迭代对象
 *  添加 [Symbol.iterator] 函数
 *  返回 一个带有next 方法 的对象
 *  next 方法 返回 对象 :{value:***,done: true (迭代完成) || false（未完成）}
 */
function iteratorObj() {
    let obj = {
        count: 0,
        [Symbol.iterator]: () => {
            return {
                next: () => {
                    obj.count++
                    if (obj.count > 10) {
                        return {
                            value: undefined,
                            done: true
                        }
                    } else {
                        return {
                            value: obj.count,
                            done: false
                        }
                    }
                }
            }
        }
    }
    for (const i of obj) {
        console.log(i)
    }
}
iteratorObj()

// 1.all 是Promise 的静态方法
/**
 * promise all 
 *  1. 返回 promise 
 *  2. 对传入的参数判断
 *  3. 循环遍历 传入的promiseList
 *  4. resolve 
 *  5. 计数++  赋值结果数组 判断计数与 参数列表长度 resolve 
 * @param {*} promiseList
 * @return {*} 
 */
function promiseAll(promiseList) {
    // 2.返回一个promise
    return new Promise((resolve, reject) => {
        // 3.判断参数类型
        if (!Array.isArray(promiseList)) return reject(new TypeError('参数必须是数组'))
        // 4.定义所有结果数组 与计数器
        let res = []
        let count = 0
        //遍历 
        promiseList.forEach((it, idx) => {
            Promise.resolve(it).then(value => {
                //计数++
                count++
                //赋值
                res[idx] = value
                //判断
                if (count === promiseList.length) resolve(res)
            }).catch(e => {
                reject(e)
            })
        })
    })
}


let pro1 = new Promise((res, rej) => {
    setTimeout(() => {
        res(1)
    }, 1000);
})

let pro2 = new Promise((res, rej) => {
    setTimeout(() => {
        res(2)
    }, 2000);
})
let pro3 = new Promise((res, rej) => {
    setTimeout(() => {
        res(3)
    }, 3000);
})

let list = [pro1, pro2, pro3]
promiseAll(list).then(res => {
    console.log(res, 111)
}).catch(e => {
    console.log(e)
})




/**
 * 防抖 
 *
 * @param {*} fn 待防抖函数
 * @param {*} wait  防抖的延迟时间
 * @return {*} 
 */
function debounce(fn, wait) {
    let timer = null
    return function () {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, arguments)
        }, wait)
    }
}

function input(e) {
    console.log(new Date())
}
let debounceInput = debounce(input, 500)



/**
 * 节流
 *
 * @param {*} fn  代节流函数
 * @param {*} space  节流间隔
 * @return {*} 
 */
function throttle(fn, space) {
    let last = 0
    let timer = null
    return function () {
        let now = Date.now()
        let remain = space - now + last
        clearTimeout(timer)
        if (remain <= 0) {
            fn.apply(this, arguments)
            last = now
        } else {
            timer = setTimeout(() => {
                fn.apply(this, arguments)
                last = now
            }, remain)
        }
    }
}


// window.addEventListener('scroll',throttle(getTime,2000))
// function getTime(){
//     console.log(new Date())
// }

let timerId = null
function mySetInterval(fn, space, ...args) {
    const recur = function () {
        timerId = setTimeout(() => {
            fn.apply(this, args)
            recur()
        }, space);
    }
    recur()
}
// /清除
function myClearInterval(id) {
    clearTimeout(id)
}
//执行
mySetInterval((a, b, c) => {
    console.log(a, b, c)
}, 1000, 1, 2, 3)
setTimeout(() => {
    myClearInterval(timerId)
}, 5000);