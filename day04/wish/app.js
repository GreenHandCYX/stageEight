let http =require('http');
let url = require('url');
let fs = require('fs');
let path = require('path');
let mime = require('mime');
let moment = require('moment');

moment.locale('zh-cn');

//加载数据库操作
let db = require('./config/db');


let template = require('art-template');
template.defaults.root = './views';
template.defaults.extname = '.html';
// 标准语法的界定符规则,更改使其不会解析前台的模板
template.defaults.rules[1].test = /##([@#]?)[ \t]*(\/?)([\w\W]*?)[ \t]*##/;
let app =http.createServer();
app.listen(3000,(err)=>{
    if(!err){
        console.log('服务器已在3000端口启动')
    }
})
app.on('request',(req,res) =>{
    //设计路由

    let {pathname,query} = url.parse(req.url,true);
    
    let realPath = path.join('./public',pathname);

    res.render =function(tpl,data){
        let html = template(tpl,data);

        res.writeHeader(200,{
            'Content-Type':'text/html;charset=UTF-8'
        })

        res.end(html);
    }

    switch (pathname) {
        case '/':
        case '/index':
            db.query('select * from lists',(err,rows)=>{
                if(!err){
                    //rows查询结果为数组
                    res.render('index',{lists:rows})
                }
            })
           
            break;
        case '/create':
            query.no = Math.ceil(Math.random()*100000);
            query.datetime = moment("2017-10-28 19:43:00","YYYY-MM-DD HH:mm:ss").fromNow();
            
            db.query('insert into lists set ?',query,(err,info)=>{
                if(!err){
                    res.writeHeader(200,{
                        'Content-Type':'application/json'
                    })
                    res.end(JSON.stringify({
                        code:10000,
                        message:'添加成功',
                        result:query
                    }));
                }
            })
            break;

        default:
            fs.readFile(realPath,(err,data)=>{
                if(!err){
                    res.writeHeader(200,{
                        'Content-Type':mime.getType(realPath)
                    })
                    res.end(data);
                }
            })
            break;
    }
})