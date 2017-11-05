let admin = require('express').Router();

let user = require('../models/user');




admin.get('/',(req,res)=>{
    res.render('admin/index',{})
})
admin.get('/logout',(req,res)=>{
  req.session.loginInfo = null;
  res.redirect('/login')
})

admin.get('/settings',(req,res)=>{
    let id = req.session.loginInfo.id;
    user.find(id,(err,row)=>{
        if(!err){
            res.render('admin/settings',{user:row})
        }
    })
  })
  admin.post('/update',(req,res)=>{
    let id = req.session.loginInfo.id;
    user.update(req.body,id,(err)=>{
        if(!err){
            return res.json({
                 code:10000,
                 msg:'修改成功'
             })
         }
         return res.json({
             code:10001,
             msg:'修改失败'
         })
    })
  })
module.exports = admin;