//声明变量name
// let {name:name} = {name:'小明'};
// console.log(name);

//声明变量abc
// let {age:abc} = {age :16};
// console.log(abc);
// console.log(age);


//声明变量abc值为16,靠属性名对应
let {age:abc} = {aaa:18,age :16};
console.log(abc);
//使用对象解构是根据左右两侧的属性来对应的
//数组解构是根据左右两侧的索引值一一对应的


//使用对象解构赋值时必须需要使用关键字声明，不加会作为对象或块解析而不是结构
//使用数组解构赋值时不需要使用关键字声明


//使用对象解构时,可以简写,相当于var {name:name,age:age}={name:'小明',age:16}
var {name,age}={name:'小明',age:16}
console.log(name,age);
//右边缺少用undefined补齐
var {name,age}={age:16}
console.log(name,age);//undefined 16




//扩展
// var {name,age,childs} ={name:'小明',age:16,childs:{name:'小小明',age:10}}
// console.log(name);
// console.log(age);
// console.log(childs);


var {name,age,childs:{name,age}} ={name:'小明',age:16,childs:{name:'小小明',age:10}}
console.log(name);
console.log(age);
console.log(childs);//此时的childs是属性而非变量childs,所以报错