let db = require('./db');


//插入用户
exports.insert = function (data, callback) {
    let query = 'insert into users set ?';

    //加密处理
    data.pass = db.md5(data.pass);

    db.query(query, data, (err) => {
        if (err) {
            return callback(err);
        }
        callback(null);
    })
}



//连接认证即登陆
exports.auth =function(email,password,cb){
    let query = 'select * from users where email = ?';
    db.query(query,email,(err,rows)=>{
        if(err){
            return cb(err);
        }
        if(!rows[0]){
           return cb({
                msg:'用户不存在'
            })
        }
        if(rows[0].pass == db.md5(password)){
            //数据库中的密码若与提交的密码一致则认证通过
           return cb(null,rows[0])
        }
        cb({
            msg:'用户名或密码错误'
        })
    })
}





exports.find = (id,cb)=>{
    let query = 'select * from users where id = ?';
    db.query(query,id,(err,rows)=>{
        if(err){
            return cb(err);
        }
        cb(null,rows);
    })
}


exports.update = function (id,data, cb) {
    let query = 'update users set ? where id=?';

    
    db.query(query,[data,id], (err) => {
        if (err) {
            return cb(err);
        }
        cb(null);
    })
}