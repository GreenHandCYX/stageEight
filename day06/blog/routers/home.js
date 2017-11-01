let express = require('express');


//引入user的方法
let user = require('../models/user');


//设置主路由
let home = express.Router();
//设置子路由
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

//注册
home.post('/register',(req,res)=>{
    user.insert(req.body,(err)=>{
        if(!err){
            //res.json可以将数据转为json格式并设置响应头
           return res.json({
                code:10000,
                msg:'注册成功'
            })
        }
        res.json({
            code:10001,
            msg:'注册失败'
        })
    })
})

//登陆
home.post('/login',(req,res)=>{
    user.login(req.body.email,req.body.pass,(err,row)=>{
        if(!err){
            //登陆成功后就要将用户信息存入session
            req.session.loginInfo = row;


            //res.json可以将数据转为json格式并设置响应头
           return res.json({
                code:10000,
                msg:'登陆成功'
            })
        }
        res.json({
            code:10001,
            msg:err.msg
        })
    })
})

//将主路由作为模块的返回值暴露出去
module.exports = home;