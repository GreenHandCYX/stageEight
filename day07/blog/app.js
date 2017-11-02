//相当于require('http')
let express = require('express');
//相当于createServer();
let app = express();

//引入body-parser处理post参数
let bodyParser = require('body-parser');


//使用中间件express-session来操作session
let session = require('express-session');



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
//判断是否是访问public
app.use('/public',express.static('./public'));

//使用中间件body-parser解析头
app.use(bodyParser.urlencoded({extended:false}));


//使用中间件express-session来操作session,引入后会在req上添加一个session对象
app.use(session({
    secret: 'fad',
    resave: false,
    saveUninitialized: false
}));


//自定义中间件，用来在访问admin时必须先判断是否存在req.session.loginInfo即是否登陆了，未登陆则需登陆
//当然除去访问登录页
app.use('/admin',(req,res,next)=>{
    if(!req.session.loginInfo && req.url!='/login'){
        //重定向
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
