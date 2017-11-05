let home = require('express').Router();

let user = require('../models/user');

home.get('/',(req,res)=>{
    res.render('home/index',{})
})

home.get('/login',(req,res)=>{
    res.render('home/login',{})
})

home.get('/register',(req,res)=>{
    res.render('home/register',{})
})

home.post('/register',(req,res)=>{
    user.inert(req.body,(err)=>{
        if(!err){
           return res.json({
                code:10000,
                msg:'注册成功'
            })
        }
        return res.json({
            code:10001,
            msg:'注册失败'
        })
    })
})
home.post('/login',(req,res)=>{
    user.login(req.body.email,req.body.pass,(err,row)=>{
        if(!err){
            req.session.loginInfo = row;
            return res.json({
                 code:10000,
                 msg:'登陆成功'
             })
         }
         return res.json({
             code:10001,
             msg:err.msg
         })
    })
})
module.exports = home;