//连接数据库
let mysql = require('mysql');


//引入md5对数据进行加密
let md5 = require('md5');


let db =mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'blog'
})


db.md5 =md5;

//将得到的conncect对象放在模块上暴露出去
module.exports = db;