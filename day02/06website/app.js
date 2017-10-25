//引入http系统模块创建服务器
let http = require('http');

//引入fs系统模块对文件进行操作
let fs = require('fs');

//引入path系统模块对路径进行处理
let path = require('path');

//引入文件模块mime判断请求文件的MIME类型
let mime = require('mime');


//创建服务器
let server = http.createServer();
//监听端口
server.listen(3000,()=>{
    console.log('服务器已启动')
});

//监听客户端是否发来了请求
//用on监听事件的执行
server.on('request',(req,res)=>{
    //通过请求地址判断该响应的内容
    if(req.url == '/'){
        //要求返回index.html
        //设置状态行和响应头的类型
        res.writeHeader(200,{
            'Content-Type':'text/html; charset=UTF-8'
        });
        //读取指定的内容作为响应结果传回页面
        //fs模块的readfile方法第二个参数是防止解析时编码造成的错误
        fs.readFile('./index.html','utf-8',(err,data)=>{
            //data指读取到的内容
           if(!err){
                res.write(data);
                res.end();
           }
        })
    }else if(req.url == '/blog'){
        res.writeHeader(200,{
            'Context-Type':'text/html;charset=UTF-8'
        })
        fs.readFile('./blog.html','utf-8',(err,data)=>{
            if(!err){
                res.write(data);
                res.end();
            }
           
        })
    }else if(req.url == '/doc'){
        res.writeHeader(200,{
            'Context-Type':'text/html;charset=UTF-8'
        })
        fs.readFile('./doc.html','utf-8',(err,data)=>{
            if(!err){
                res.write(data);
                res.end();
            }
           
        })
    }else{
        //请求js/css/image等资源
        //因为请求地址是/css/main.css包含/所以要想读取必须是相对路径
        //通过path模块的join方法可以解决这个问题

        let realPath = path.join('./',req.url);
     
        res.writeHeader(200,{
            //通过mime模块的getType属性获取指定路径的MIME类型
            'Content-Type':mime.getType(realPath)
        })
        fs.readFile(realPath,(err,data)=>{
            if(!err){
                res.write(data);
                res.end();
            }
        })
      
    }
})