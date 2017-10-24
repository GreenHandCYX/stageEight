//es6中提供了一种新的定义函数的方式(定义函数通常有名字,参数,返回值)
//具名函数
let fn = (arg) => {
    console.log(arg);
    console.log('我是箭头函数')
}
fn('测试');

//匿名函数
setTimeout(()=>{
    console.log('我是匿名的箭头函数')
},2000);


//简写
var bar = () => 'hello';
//相当于
// var  bar = () => {return 'hello'};
console.log(bar());
