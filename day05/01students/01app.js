//相当于require('http')
let express = require('express');
//相当于createServer();
let app = express();

//监听端口
app.listen(3000);

//express没有内置模板引擎功能
//但是它可以非常方便的支持其他模板引擎

//引入xtpl模板,由nodejs基于xtemplate安装
//所以安装xtpl必须同时安装xtemplate

//set方法以键值对的形式设置模板的配置
//设置模板的目录为./views
app.set('views','./views');
//使用模板引擎xtpl，设置模板后缀为xtpl
//xtpl模块不需要手动引入由express内部自动引入
app.set('view engine','xtpl')

//express.static专门用于处理静态资源,只需指定一个路径即可
app.use(express.static('./public'));

//use引入一个中间件
//中间件指:对整个请求或响应的处理逻辑称为中间件



//客户端以get方式请求的时候
app.get('/',(req,res)=>{
    // //相当于write+end
    // res.send('hello express!');

    //xtpl内部对模板方法做了封装
    res.render('add',{});
})
//get,post可以直接处理路由
app.get('/add',(req,res)=>{
    res.render('add',{});
})
app.get('/list',(req,res)=>{
    res.render('list',{});
})
app.post('/add',(req,res)=>{
    res.send('hello express! post');
})