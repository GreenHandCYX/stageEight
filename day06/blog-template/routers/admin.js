let express = require('express');
//设置主路由
let admin = express.Router();


let post = require('../models/post')


let user = require('../models/user')

//设置子路由
admin.get('/',(req,res)=>{

    res.render('admin/index',{});
})
admin.get('/blog_add',(req,res)=>{
    res.render('admin/blog_add',{});
})


admin.get('/repass',(req,res)=>{
    res.render('admin/repass',{});
})



admin.get('/logout',(req,res)=>{
    req.session.loginfo = {};
    res.redirect('/login')
})


//添加博客
admin.post('/blog_add',(req,res)=>{

    //将当前作者信息保存
    req.body.uid = req.session.loginfo.id;

    post.insert(req.body,(err)=>{
        if(!err){
            res.json({
                code:10000,
                msg:'添加成功'
            });
        }
    })
})




admin.get('/blog_list',(req,res)=>{
    post.findAll((err,rows)=>{
        if(err){
            return res.send('数据库错误')
        }
        res.render('admin/blog_list',{posts:rows})
    })
})



admin.get('/delete',(req,res)=>{
    console.log(1212)
    //通过req.query接受get参数
    post.delete(req.query.id,(err)=>{
        if(!err){
            res.json({
                code:10000,
                msg:'删除参数'
            })
        }
    })
})


admin.get('/settings',(req,res)=>{

    let uid =req.session.loginfo.id;

    user.find(uid,(err,rows)=>{
        if(!err){
            res.render('admin/settings',{user:rows[0]});
        }
    });
   
})

admin.post('/update',(req,res)=>{
    
        //将当前作者信息保存
        var uid = req.session.loginfo.id;

        user.update(uid,req.body,(err)=>{
            if(!err){
                res.json({
                    code:10000,
                    msg:'修改成功'
                });
            }
        })
    })

//作为模块的返回值暴露出去
module.exports=admin;