# 相关

## 基础类型
```ts

1. Boolean
let isFalseOrTrue: boolean = false; 

2. Number
let num :number =1

3. String
let str :string = '字符串'

4. Array
let arr :number[] = [1,2,3];
let list: Array<number> = [1, 2, 3];  //数组泛型  Array<元素类型>

5. Tuple
let x = [string,number] = ['1111',1111]

6. enum
enum Color {Red, Green, Blue}  // 默认 值为下标  可以手动设置{Red=1, Green=5, Blue=6}
let c: Color = Color.Green; //1
let colorName:  string  = Color[1]; // 'Green'

7. any 任意类型 且可以调用任意方法
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

8. Void  表示没有任何类型 一般用于没有任何返回的函数  赋值变量只能是 undefined 或者 null

function warnUser(): void {
    console.log("This is my warning message");
}
let unusable: void = undefined;

9. null undefined 默认是所有类型的子类型  当指定 --strictNullChecks 时 只能赋值给 void undefined null

10. never
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}

11. object object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。
let obj:object = {
    a :1 
}

```


## 类型断言
1. 尖括号 <type>    <string>someValue
2. as   jsx 只允许 as someValue as string


## 接口 
```ts
    interface LabelledValue {
        label : string;,
        size ?: number,
        readonly isReadonly : boolean,

    }

    function printLabel(labelledObj: LabelledValue) {
        console.log(labelledObj.label);
    }

    let myObj = {size: 10, label: "Size 10 Object"};
    printLabel(myObj);
```

