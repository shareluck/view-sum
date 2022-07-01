import { name } from "./todo.js";
function sayName ({name,version}){
    console.log(`hello ${name},${version}`)
}
sayName({name,version}) 