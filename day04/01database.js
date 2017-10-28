let http =require('http');
let url = require('url');
let fs = require('fs');
let path = require('path');


//使用第三方模块来操作数据库
let mysql = require('mysql');
//通过mysql模块提供的的方法实现对mysql数据库的操作
//有如下方法:
//a)连接数据库
let connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : '123456',
    database : 'wish'
})
console.log(connection);
// //b)执行SQL语句
// //查询
connection.query('SELECT * FROM lists',(err,rows)=>{
    if(!err){
        console.log(rows);
    }
})

// //插入
// connection.query("INSERT INTO lists (id,username,content,no,datetime) VALUES (null,'web','哈哈哈',123123,'2017-10-28 12:03:22')");

// //查询用户名为itcast的用户
// //select * from lists where username = 'itcast'
// //为了避免字符串的拼接mysql模块进行了封装处理，可以使用?充当一个占位符，表示此处将来会替换为一个变量
// let username = 'itcast';
// let no = 1;
// // connection.query("select * from lists where username = ? and no = ?",[username,no],(err,rows)=>{
// //     console.log(rows)
// // })

// //如果数据是对象会将对象转为key=value,key1=value1
// //此语句没有结果输出
// let s=connection.query('SELECT * from lists where ?',{username:username},(err,rows)=>{
//     console.log(rows)
// })
// //通过query的返回值可以返回query真正执行的sql语句
// console.log(s.sql);

//插入的第二种方式
//insert into lists set  key=val,key1=val1...
// connection.query('INSERT INTO lists SET ?',{username:username,no:no})

// let app =http.createServer();
// app.listen(3000,(err)=>{
//     if(!err){
//         console.log('服务器已在3000端口启动')
//     }
// })
// app.on('request',(req,res) =>{
//     //设计路由
//     res.end('study mysql');
// })