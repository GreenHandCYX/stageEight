//通过系统模块path可以用来获得路径相关信息
//比如文件名,目录名，文件后缀等


let path = require('path');


//1.parse方法可以解析文件目录相关信息
let img = './images/20171024/logo.png';
console.log(path.parse(img));


// let {dir,name,ext} = path.parse(img);
// console.log(dir,name,ext);



//2.dirname方法可以直接获取目录名称
let dir = path.dirname(img);
console.log(dir)


//3.extname方法可以获取文件后缀
let ext = path.extname(img);
console.log(ext)


//4.join方法可以处理多个路径,会自动根据操作系统的类型加路径标识符/或\
// console.log(path.join('./a','./b','./c'));// a/b/c
//console.log(path.join('a','b','c','../d'));// a\b\d


//Linux使用/
//window使用 / 和 \



var a = './abc/aa';
var b = 'abc/b';
// a+b;//./abc/aaabc/b
console.log(path.join(a,b))//可以自动添加路径标识符