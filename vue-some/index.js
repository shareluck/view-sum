import Vue from "./myVue/vue.js";
let ele = document.getElementById('app') || '#app'
// console.log(ele,111)
const vm = new Vue({
    el:ele,
    data:{
        count :0,
        msg:'msgmsgmsgmsgmsgmsg',
        htmlTest:'<ul><li>11111</li></ul>',
    },
    methods:{
        getCount(){
            console.log(this.count)
            this.getMsg()
        },
        getMsg(){
            console.log(this.msg)
        }
    }
})

console.log(vm,'vm实例')