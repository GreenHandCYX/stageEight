//相当于require('http')
let express = require('express');
//相当于createServer();
let app = express();
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


//引入前后台路由模块
let admin = require('./routers/admin');
let home = require('./routers/home');


//将主路由作为中间件加载进来
app.use('/admin',admin);
app.use('/',home);