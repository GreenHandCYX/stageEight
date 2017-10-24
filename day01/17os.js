//在nodejs将很多常用功能进行了封装，称为模块


//nodejs安装时会自动安装很多模块称为系统模块,如fs path os http

//os模块封装了读取系统信息的功能
//使用os模块，需先使用require将其引入

//require需传入系统模块的名称,并会得到一个返回值
let os = require('os');
// console.log(os)
// console.log(os.hostname());
// console.log(os.cpus());
console.log(os.userInfo());