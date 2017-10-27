//引入http系统模块创建服务器
let http = require('http');

//引入fs系统模块对文件进行操作
let fs = require('fs');

//引入path系统模块对路径进行处理
let path = require('path');


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

    let realPath = req.url == '/'?'index.html':req.url;
    realPath = path.join('.',realPath);


    function render(path){
        fs.readFile(path,(err,data)=>{
            if(err){
                res.writeHeader('404');
                res.write('<h1>404 Not Found</h1>');
                return res.end();
            }
            res.write(data);
            res.end();
        })
    }

    render(realPath)
})