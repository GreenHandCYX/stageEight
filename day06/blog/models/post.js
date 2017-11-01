//引入数据库
//操作post表
let db =require('./db');
//将方法挂载到该模块对象上
exports.insert = (data,fn)=>{
    let query = 'insert into posts set ?';
    db.query(query,data,(err)=>{
        if(err){
            return fn(err)
        }
        fn(null);
    })
}


//全查
exports.queryAll = (fn)=>{
    let query = 'select * from posts';
    db.query(query,(err,rows)=>{
        if(err){
            return fn(err)
        }
        fn(null,rows);
    })
}


//删除指定
exports.delete = (id,fn)=>{
    let query = 'delete from posts where id = ?';
    db.query(query,id,(err)=>{
        if(err){
            return fn(err)
        }
        fn(null);
    })
}


