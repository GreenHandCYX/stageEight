
let http =require('http');
let server = http.createServer();
let url =require('url');
let fs = require('fs');

let tempalte = require('art-template');
//设置文件的默认查找路径
tempalte.defaults.root = __dirname;
//设置文件的后缀名
tempalte.defaults.extname = '.html';

server.listen(3000);
server.on('request',(req,res)=>{
    let {pathname} = url.parse(req.url);
    let realPath = '.'+pathname;

    res.render = function(index,data){
       let html = tempalte(index,data);
        res.write(html);
        res.end();
    }


    switch (pathname) {
        case '/':
            let data = {
                title:'许愿墙',
                info:'学习使用模板引擎'
            }
            res.render('index',data)
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