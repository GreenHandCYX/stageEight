let express = require('express');
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
//将主路由作为模块的返回值暴露出去
module.exports = home;