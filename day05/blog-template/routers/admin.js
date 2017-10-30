let express = require('express');
//设置主路由
let admin = express.Router();
//设置子路由
admin.get('/',(req,res)=>{
    res.render('admin/index',{});
})
admin.get('/blog_add',(req,res)=>{
    res.render('admin/blog_add',{});
})
admin.get('/blog_list',(req,res)=>{
    res.render('admin/blog_list',{});
})
admin.get('/repass',(req,res)=>{
    res.render('admin/repass',{});
})
admin.get('/settings',(req,res)=>{
    res.render('admin/settings',{});
})
//作为模块的返回值暴露出去
module.exports=admin;