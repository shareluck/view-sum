// let obj = {
//     a:{
//         a1:{
//             a2:1
//         }
//     },
//     b:2,
//     c:[1,2,3]
// }



// const reactive = function (obj){
//     if(!obj || typeof obj !=='object') return 
//     Object.keys(obj).forEach(key=>{
//         // defineProperty(obj,key,obj[key])
//         let val = obj[key]
//         Object.defineProperty(obj,key,{
//             get(){
//                 reactive(val)
//                 return val
//             },
//             set(newVal){
//                 if(val === newVal) return
//                 val = newVal
//                 render(key,newVal)
//                 reactive(val)
//             }
//         })
//     })
// }


// const render  = function(key,value){
//     console.log(key,value)
// }

// const defineProperty = function(data,key,val){
//     reactive(val)
//     Object.defineProperty(data,key,{
//         get(){
//             return val
//         },
//         set(newVal){
//             if(val === newVal) return
//             val = newVal
//             render(key,newVal)
//         }
//     })
// }

// reactive(obj)
// obj.a.a1.a2 =2
// obj.a.a1 ={b:1,c:2}
// obj.b =1
// obj.c[0] =  121



let node = {
    tag:'DIV',
    attr:{
        id:'app'
    },
    children:[
        {
            tag:'DIV',
            attr:{
                id:'app'
            },
            children:[
                {
                    tag:'SPAN',
                    attr:{
                        style:'color:red'
                    },
                    children:[]
                }
            ]
        }

    ]
}


function render(vNode){
    if(typeof vNode === 'number'){
        vNode =  String(vNode)
    }

    if(typeof vNode === 'string'){
        vNode =  document.createTextNode(vNode)
    }

    const element = document.createElement(vNode.tag)
    Object.keys(vNode.attrs).forEach(attr=>{
        element.setAttribute(attr,vNode.attrs[attr])
    })
    if(vNode.children){
        vNode.children.forEach((childNode)=>{
            element.appendChild(render(childNode))
        })
    }
    console.log(element)
    return element
}
render(node)