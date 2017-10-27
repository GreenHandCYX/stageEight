let http =require('http');

let url = require('url');

let path = require('path');

let fs = require('fs');

let template = require('art-template');


//配置模板引擎
//更改默认查找路径
template.defaults.root = __dirname;
// 默认后缀名。如果没有后缀名，则会自动添加 extname
template.defaults.extname = '.html';

let server = http.createServer();
server.listen(3000);
server.on('request',(req,res)=>{
    //路由是地址与程序间的映射关系(地址不应包含参数)

    //路由是由开发人员设计的

    //通过req.url可以获得地址
let {pathname} =  url.parse(req.url);

let realPath = path.join('./',pathname);

res.render = function(tpl,data){
    //当引入art-template模板引擎后会得到一个函数叫template

    //调用这个函数
    //template(模板路径,数据)

    //默认去根路径下找(window下盘符即根路径，在linux下/表示根路径)
    
   let html = template(tpl,data);
    res.write(html);
    // fs.readFile(tpl+'.html',(err,data)=>{
    //     res.write(data);
    //     res.end();
    // })
}

    switch (pathname) {
        case '/':  
            //响应index.html
            console.log('来到了a路由');
            var title = '首页';
            res.render('index',{title:title})
            break;
        case '/doc':
            //响应doc.html
            console.log('来到了b路由')
            var title = '文档';
            res.render('doc',{title:title})
            break;
        case '/blog':
            //响应blog.html
            console.log('来到了c路由')
            var title = '博客';
            res.render('blog',{title:title})
            break;
        default:
            fs.readFile(realPath,(err,data)=>{
                if(!err){
                    res.write(data);
                    res.end();
                }
            })
            break;
    }

})