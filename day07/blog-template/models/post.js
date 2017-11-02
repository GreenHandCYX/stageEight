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


//全查(连表查询)
exports.queryAll = (...args)=>{
    // 由于调用时参数个数不确定
    // 所以使用 ... 语法来接收参数
    // ... 语法可以将所有参数接收到一个数组中

    let query,offset,pageSize,cb;
    if(args.length == 1 && typeof(args[0]) == 'function'){
        // 当只传一个参数，并且为回调函数时
        // 查询所有数据，不做分页处理
        // sql 语句
        query = 'select p.id as id,p.uid,p.title,p.brief,p.content,p.status,p.time,u.id as userid,u.name,u.pass,u.email,u.avatar,u.gender,u.phone,u.company,u.homepage,u.alt from posts p left join users u on p.uid = u.id';
        // 第1个参数就是回调函数
        cb = args[0]
    }else{
        // 当传递3个参数时
        // 根据参数位置获取相对应参数
        // 每页条数
        pageSize = args[0];
         // 当前第几页
        page = args[1];
        // 计算页码数据起始位置
        offset = (page - 1)*pageSize;
        query = 'select p.id as id,p.uid,p.title,p.brief,p.content,p.status,p.time,u.id as userid,u.name,u.pass,u.email,u.avatar,u.gender,u.phone,u.company,u.homepage,u.alt from posts p left join users u on p.uid = u.id limit ?,?';
        // 第3个参数为回调函数
        cb = args[2];
    }

  
    db.query(query,[offset,pageSize],(err,rows)=>{
        if(err){
            return cb(err)
        }
        cb(null,rows);
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



//单查
module.exports.find = (id,cb) =>{
    let query = 'select * from posts left join users on posts.uid = users.id where posts.id =?';
    db.query(query,id,(err,rows)=>{
        if(err){
            return cb(err);
        }
        cb(null,rows)
    })
}



//博客总条数
exports.count = (cb)=>{
    let query = 'select count(*) as total from posts';
    db.query(query,(err,rows)=>{
        if(err){
            return cb(err);
        }
        cb(null,rows[0])
    })
}



//修改
module.exports.modify  = (id,data,cb)=>{
    let query = 'update posts set ? where id=?';
    //nodejs中回调函数的第一个参数永远是err
    db.query(query,[data,id],cb)
}