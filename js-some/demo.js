class Array1 extends Array{
    isEmpty(){
        return this.length===0
    }
}
let a = new Array1(1,2,3)
console.log(a)
console.log(a.isEmpty())
let b = a.filter(it=>it>3)
console.log(b)
console.log(b.isEmpty())
Array1.isArray(b)