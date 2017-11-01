let express = require('express');
//设置主路由
let home = express.Router();
//设置子路由


//处理用户数据
let user = require('../models/user');



home.get('/',(req,res)=>{
    res.render('home/index',{});
})
home.get('/about',(req,res)=>{
    res.render('home/about',{});
})
home.get('/article',(req,res)=>{
    res.render('home/article',{});
})
home.get('/center',(req,res)=>{
    res.render('home/center',{});
})
home.get('/join',(req,res)=>{
    res.render('home/join',{});
})
home.get('/login',(req,res)=>{
    res.render('home/login',{});
})
home.get('/register',(req,res)=>{
    res.render('home/register',{});
})

//注册用户
home.post('/register',(req,res)=>{

    user.insert(req.body,(err)=>{
        if(!err){
            //自动设置为json格式响应给前端并设置响应头
            return res.json({
                code:10000,
                msg:'添加成功'
            });
        }
        res.json({
            code:10001,
            msg:'添加失败!'
        })
       
    })
 
})



//登陆
home.post('/login',(req,res)=>{
    user.auth(req.body.email,req.body.pass,(err,row)=>{
        if(!err){
            //存一个session
             //如果req.session.loginfo不为空,则认为登陆成功
            req.session.loginfo = row;
           

            //登陆成功则将反馈返回给页面
            return res.json({
                code:10000,
                msg:'登陆成功'
            })
        }
        //登陆失败则将反馈返回给页面
        res.json({
            code:10001,
            msg:err.msg || err
        })
    })

  
})

//将主路由作为模块的返回值暴露出去
module.exports = home;