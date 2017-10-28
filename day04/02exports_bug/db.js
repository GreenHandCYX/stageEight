

var mysql = require('./mysql');


var db = mysql.createConnection({

});

// db 是一个对象
// console.log(db);

// exports = db;
// 

// exports.db = db;

module.exports = db;