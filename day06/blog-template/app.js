//相当于require('http')
let express = require('express');
//相当于createServer();
let app = express();


let session = require('express-session')

//
let bodyParser = require('body-parser');


//监听端口
app.listen(3000,(err)=>{
    if(!err){
        console.log('服务器已在3000端口启动')
    }
});


//引入xtpl前必须安装xtemplate
//加载模板引擎以键值对的形式配置路径及后缀
app.set('view engine','xtpl');
app.set('views','./views');

//使用中间件(express.static)加载静态插件
app.use(express.static('./public'));

//解析post数据的中间件
app.use(bodyParser.urlencoded({extended:false}))


//使用中间件session来处理session
//当使用了session中间件后就在req上添加了一个session 属性，通过这个属性可以实现设置和读取session的作用
//类似于php中的$_SESSION
app.use(session({
    secret: 'myruleadf',//加密规则
    resave: false,//是否不修改session时也保存session
    saveUninitialized: false//初始化
}))


//在nodejs中默认情况下session是放到内存中的,所以当服务器重启后session就消失了


//http要求先设置请求头再设置响应主体

//在访问后台admin下页面时需要通过中间件检测登陆
app.use('/admin',(req,res,next)=>{
    //若不存在req.session.loginfo并且不为/login时需要重新登陆
    if(!req.session.loginfo && req.url !='/login'){
        //express的重定向
        return res.redirect('/login');
    }
    next();
})



//引入前后台路由模块
let admin = require('./routers/admin');
let home = require('./routers/home');


//将主路由作为中间件加载进来
app.use('/admin',admin);
app.use('/',home);
