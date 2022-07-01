// 依赖引用
// import  {sum} from "./todo.js";
// import {a,b} from './json.js'
// let c = sum()
// console.log(c,a,b)
// cnosole.log(a) 测试 source-map  看错误更方便

//静态导入
// import _ from 'lodash';
// function component() {
//     const element = document.createElement('div');
//    // lodash（目前通过一个 script 引入）对于执行这一行是必需的
//    // lodash 在当前 script 中使用 import 引入
//     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
 
//     return element;
//   }
 
//   document.body.appendChild(component());



//动态导入   import().then()   async awati
// function getComponent() {
// // Lodash, now imported by this script
//     return import('lodash')
//         .then(({ default: _ }) => {
//             const element = document.createElement('div');

//             element.innerHTML = _.join(['Hello', 'webpack'], ' ');

//             return element;
//         })
//         .catch((error) => 'An error occurred while loading the component');
// }

// async function getComponent() {
//     // Lodash, now imported by this script
//     const element = document.createElement('div');
//     const { default: _ } = await import('lodash');
//     element.setAttribute('style','line-height:1;width:100px;border:1px solid #000')
//     element.contentEditable = true
//     element.innerHTML = `1111<span style="display:inline-block;color:red;border-radius:25%;border:1px solid #000;overflow:hidden"> 标签 </span>`
//     return element;
// }

// getComponent().then((component) => {
//   document.body.appendChild(component);
// });


// const ul = document.querySelector('ul')
// const edit = document.querySelector('.edit')
// let  selection = window.getSelection();
// let last = selection.getRangeAt(0)
// ul.addEventListener('click',(e)=>{
//     console.log(e.target.innerText)
//     edit.innerHTML += `<div class="tag" contenteditable="false">${e.target.innerText}</div> `
//     edit.focus()
//     last = selection.getRangeAt(last)
//     console.log(last)
// })
// console.log(edit)