//引入数据库
//操作user表
let db = require('./db');

//将方法挂载到该模块对象上
exports.insert = (data,fn)=>{
    let query = 'insert into users set ?';
    //对密码进行加密
    data.pass = db.md5(data.pass);
    db.query(query,data,(err)=>{
        if(err){
            return fn(err)
        }
        fn(null);
    })
}



//登陆
exports.login = (email,pass,cb)=>{
    let query = 'select * from users where email=?';
    db.query(query,email,(err,rows)=>{
        if(err){
            return cb(err);
        }
        //用户不存在则提示
        if(!rows[0]){
            return cb({
                msg:'用户不存在'
            })
        }
        //判断密码是否一致
        if(db.md5(pass) == rows[0].pass){
           return cb(null,rows[0])
        }
        cb({
            msg:'用户或密码错误'
        })

    })
}


//单查
exports.query = (id,fn)=>{
    let query = 'select * from users where id =?';
    db.query(query,id,(err,rows)=>{
        if(err){
            return fn(err)
        }
        fn(null,rows[0]);
    })
}


//修改
exports.update= (id,data,fn)=>{
    let query = 'update users set ? where id =?';
    db.query(query,[data,id],(err)=>{
        if(err){
            return fn(err)
        }
        fn(null);
    })
}
