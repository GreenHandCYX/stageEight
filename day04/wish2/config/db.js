let mysql = require('mysql');

//将连接结果作为模块的返回结果暴露出去
module.exports = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'wish'
});