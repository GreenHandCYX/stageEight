let express = require('express');
//设置主路由
let admin = express.Router();
//设置子路由


//引入post的方法
let post = require('../models/post');
//引入user的方法
let user= require('../models/user');

admin.get('/',(req,res)=>{
    
    res.render('admin/index',{});
})
admin.get('/add',(req,res)=>{
    res.render('admin/blog_add',{});
})

admin.get('/repass',(req,res)=>{
    res.render('admin/repass',{});
})

//退出登陆
admin.get('/logout',(req,res)=>{
    req.session.loginInfo = null;
    res.redirect('/login');
})

//添加文章
admin.post('/add',(req,res)=>{
    //通过session存入当前作者信息
    req.body.uid = req.session.loginInfo.id;
    post.insert(req.body,(err)=>{
        if(!err){
            //res.json可以将数据转为json格式并设置响应头
           return res.json({
                code:10000,
                msg:'添加成功'
            })
        }
        res.json({
            code:10001,
            msg:'添加失败'
        })
    })
})

//文章列表页
admin.get('/list',(req,res)=>{
    post.queryAll((err,rows)=>{
        if(!err){
            res.render('admin/blog_list',{lists:rows});
        }
    })
})

//删除指定文章
admin.get('/delete',(req,res)=>{
    post.delete(req.query.id,(err)=>{
        console.log(err)
        if(!err){
            //res.json可以将数据转为json格式并设置响应头
           return res.json({
                code:10000,
                msg:'删除成功'
            })
        }
        res.json({
            code:10001,
            msg:'删除失败'
        })
    })
})

//个人中心
admin.get('/settings',(req,res)=>{
    //通过session获取当前用户
    let id = req.session.loginInfo.id;
    user.query(id,(err,rows)=>{
        if(!err){
            res.render('admin/settings',{user:rows});
        }
       
    })
})
//修改当前用户
admin.post('/update',(req,res)=>{
    let id = req.session.loginInfo.id;
    user.update(id,req.body,(err)=>{
        if(!err){
            //res.json可以将数据转为json格式并设置响应头
           return res.json({
                code:10000,
                msg:'修改成功'
            })
        }
        res.json({
            code:10001,
            msg:'修改失败'
        })
       
    })
})


//作为模块的返回值暴露出去
module.exports=admin;