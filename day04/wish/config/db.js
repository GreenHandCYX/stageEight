//使用第三方模块来操作数据库
let mysql = require('mysql');





// //连接数据库
module.exports =  mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'wish'
})


