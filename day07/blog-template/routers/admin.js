let express = require('express');
//设置主路由
let admin = express.Router();
//设置子路由


//引入post的方法
let post = require('../models/post');
//引入user的方法
let user= require('../models/user');



//使用Multer中间件来处理上传
var multer  = require('multer');
// var upload = multer({ dest: 'public/admin/uploads/avatar'})
//通过diskStorage实现对上传位置和文件名的配置
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/admin/uploads/avatar')
    },
    filename: function (req, file, cb) {
    let extname = file.originalname.slice(file.originalname.lastIndexOf('.'));
      cb(null, file.fieldname + '-' + Date.now() + extname )
    }
  })
  
var upload = multer({ storage: storage });






admin.get('/',(req,res)=>{
    
    res.render('admin/index',{});
})
admin.get('/add',(req,res)=>{
    res.render('admin/manage',{
        action:'/admin/add'
    });
})

//编辑博客文章
admin.get('/edit',(req,res)=>{
    //req.query获得文章id，然后由此获得文章信息
    post.find(req.query.id,(err,rows) =>{
        if(!err){
           return res.render('admin/manage',{
               post:rows[0],
               action:'/admin/modify'
            });
        }
    });
  
})
admin.post('/modify',(req,res)=>{
    let id = req.body.id;
    delete req.body.id;
    post.modify(id,req.body,(err)=>{
        if(!err){
            return res.json({
                code:10000,
                msg:'修改成功'
            })
        }
    })
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




//头像上传
admin.post('/upfile',upload.single('avatar'),(req,res)=>{
   //通过multer中间件的single来获取文件上传的参数，并上传到某个目录
   //使用multer中间件后会在req上添加一个file属性存储文件信息
   res.json({
        code:10000,
        msg:'上传成功',
        path:req.file.path
   })
})


//作为模块的返回值暴露出去
module.exports=admin;