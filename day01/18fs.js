//通过系统模块fs可以实现目录及文件的操作(增删改查)

let fs =require('fs');
//mkdir可以支持两个参数
//第一个参数为目录名称
//第二个参数为回调函数，操作创建结果，例如存在后再创建提示错误信息
// fs.mkdir('test',(err) => {
//     //如果有错误err为一个对象，描述错误的原因
//     //如果没有错误为null
//     console.log(err)
// });


//在指定文件中创建文件
//第一个参数为指定要在哪里创建什么文件的路径
//第二个参数为写入文件内的内容,不传会将undefined写入
//第三个参数为回调函数
fs.writeFile('./test/aa.html','<h1>hello world</h1>',(err)=>{
    if(!err){
        console.log('文件创建成功')
    }
});
