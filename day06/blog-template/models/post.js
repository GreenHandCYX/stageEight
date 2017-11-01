let db =require('./db');

exports.insert = (data,cb)=>{
    let query = 'insert into posts set ?';
    db.query(query,data,(err)=>{
        if(err){
            cb(err);
            return;
        }
        cb(null)
    })
}



exports.findAll = (cb)=>{
    let query = 'select * from posts';
    db.query(query,(err,rows)=>{
        if(err){
            return cb(err);
        }
        cb(null,rows)
    })
}



exports.delete = (id,cb)=>{
    let query = 'delete from posts where id = ?';
    db.query(query,id,(err)=>{
        if(err){
            return cb(err);
        }
        cb(null)
    })
}


