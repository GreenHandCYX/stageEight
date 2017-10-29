let http = require('http');
let url = require('url');
let path = require('path');
let mime = require('mime');
let fs = require('fs');

let template=require('art-template');
//更改默认查找路径及后缀
template.defaults.root = './views';
template.defaults.extname = '.html';
//为防止在读取页面对页面本身的模板也进行解析需要更改后台模板引擎的默认解析模式（将{{}}改为## ##）
template.defaults.rules[1].test = /##([@#]?)[ \t]*(\/?)([\w\W]*?)[ \t]*##/;

//引入自己封装的数据库模块
let db = require('./config/db');
//创建服务器
let app = http.createServer();


//引入时间模块处理时差
let moment = require('moment');
//设置返回格式为中文
moment.locale('zh-cn');



app.listen(3000,(err)=>{
    if(!err){
        console.log('服务器已在3000端口启动')
    }
})

app.on('request',(req,res)=>{
    //获取路由地址及参数
    let {pathname,query} = url.parse(req.url,true);
    //设置文件读取路径
    let realPath = path.join('./public',pathname);
    //封装模板读取方法
    res.render=function(tpl,data){
        res.writeHeader(200,{
            'Content-Type':'text/html;charset=UTF-8'
        })
        let html = template(tpl,data);
        res.end(html);
    }

    //设置路由
    switch (pathname) {
        case '/':
        case '/index':
             //查询所有
            db.query('SELECT * FROM lists',(err,rows)=>{
                if(!err){
                    //rows是一个数组
                     //在渲染前处理时间差
                   rows.forEach(function(ele) {
                    ele.datetime = moment(ele.datetime,"YYYY-MM-DD HH:mm:ss").fromNow();
                    ele.random =  Math.floor(Math.random()*5)+1;   
                   });

                   res.render('index',{list:rows})
                }
            })  
            break;
        case '/create':
            //添加
            //需要后台添加no和datetime，datetime需要用moment.js模块来返回时差
            query.no = Math.ceil(Math.random()*100000);  
            query.datetime = new Date();
             db.query('INSERT INTO lists set ?',query,(err)=>{
                if(!err){
                    
                    //设置响应头便于$.ajax解析JSON字符串
                    res.writeHeader(200,{
                        'Content-Type':'application/json'
                    }) 
                    //在渲染前处理时间差
                    query.datetime = moment(query.datetime,"YYYY-MM-DD HH:mm:ss").fromNow();
                    //控制随机显示颜色
                    query.random =  Math.floor(Math.random()*5)+1; 
                   
                    //返回一个含反馈信息的对象更易于操作，转为json格式
                    res.end(JSON.stringify({
                        code:10000,
                        msg:'添加成功',
                        result:query//将添加的数据响应到页面进行添加
                    }))
                }
            })
          
        break;
        default:
            //js,css,image等文件
            fs.readFile(realPath,(err,data)=>{
                if(!err){
                    res.writeHeader(200,{
                        'Content-Type':mime.getType(pathname)
                    })
                    res.end(data)
                }
            })
            break;
    }
})