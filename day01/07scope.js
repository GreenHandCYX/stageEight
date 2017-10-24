// var abc ='hello';


function fn(){
    var abc = 'world';
}


//es6中{}内都是块级作用域，块级变量外部不可访问
//使用let来创建一个块级变量

if(true){
    // var abc = 'hello world!';
    let abc = 'hello world!';
    console.log(abc)
}
console.log(abc)


//使用const来创建一个块级常量,不可更改
const abc=1;
console.log(abc);
//1.可创建一个块级作用域  
if(true){
   
    const abc = '123!';
    console.log(abc)
}
console.log(abc)
//2.不可赋值
//3.常量声明必须有指
// const bcd;报错
// bcd = 2;
//4.没有变量提升
