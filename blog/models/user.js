let db = require('./db');

exports.inert = (data,cb)=>{
    data.pass = db.md5(data.pass);
    let query = 'insert into users set ?';
    db.query(query,data,cb);
}


exports.login = (email,pass,cb)=>{
    let query = 'select * from users where email=?';
    db.query(query,email,(err,rows)=>{
        if(err){
           return cb(err);
        }
        if(!rows[0]){
            return cb({
                msg:'用户不存在'
            })
        }
        if(rows[0].pass == db.md5(pass)){
            return cb(null,rows[0]);
        }
        cb({
            msg:'用户名或密码错误'
        })
    })
}


exports.find = (id,cb)=>{
    let query ='select * from users where id=?';
    db.query(query,id,(err,rows)=>{
        if(!err){
            cb(null,rows[0])
        }
    })
}
exports.update = (data,id,cb)=>{
    let query ='update users set? where id=?';
    db.query(query,[data,id],cb)
}