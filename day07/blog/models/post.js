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
exports.queryAll = (...args)=>{
    //因为无法判断传递的参数的个数所以需要...args来代表实参数组
    //如果只有一个参数且为回调函数则为普通的连表全查
    let query,cb,offset,pageSize;
    if(args.length==1 && typeof(args[0])=='function'){
        query= 'select p.id,p.uid,p.title,p.brief,p.content,p.status,p.time,u.id as userid,u.name,u.pass,u.email,u.avatar,u.gender,u.phone,u.company,u.homepage,u.alt from posts p left join users u on p.uid = u.id';       
        cb=args[0];
    }else{
        //多个参数则为分页查询
        let page = args[0];//当前页码
        pageSize = args[1];//每页的条数
        offset = (page-1)*pageSize;//查询起始点
        cb = args[2];
        query= 'select p.id,p.uid,p.title,p.brief,p.content,p.status,p.time,u.id as userid,u.name,u.pass,u.email,u.avatar,u.gender,u.phone,u.company,u.homepage,u.alt from posts p left join users u on p.uid = u.id limit ?,?';       
    }

     db.query(query,[offset,pageSize],(err, rows) => {
        if(err) {
            // 失败回调
            return cb(err);
        }
        // 成功回调
        cb(null, rows);
    });
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
exports.find = (id,fn)=>{
    let query = 'select p.id,p.uid,p.title,p.brief,p.content,p.status,p.time,u.id as userid,u.name,u.pass,u.email,u.avatar,u.gender,u.phone,u.company,u.homepage,u.alt from posts p left join users u on p.uid = u.id where p.id=?';
    db.query(query,id,(err,rows)=>{
        if(err){
            return fn(err)
        }
        fn(null,rows[0]);
    })
}


//更新
exports.modify= (id,data,fn)=>{
    let query = 'update posts set ? where id =?';
    db.query(query, [data, id], fn);
}


//查询总条数
exports.count = (cb)=>{
    let query = 'select count(*) as total from posts';
    db.query(query,  (err, rows) => {
        if(err) {
            // 失败回调
            return cb(err);
        }
        // 成功回调
        cb(null, rows[0]);
    });
}

