//通过系统模块创建http服务器
let http = require('http');
//通过createServer可以创建服务器实例

let server =http.createServer();
//通过listen监听端口
server.listen(3000);


//通过事件监听request处理响应和请求
//on来实现事件监听
server.on('request',(req,res)=>{
    //通过req来处理请求
    //通过res来处理响应

    //响应 由状态行。响应头，响应主题构成
    //通过writeHead()来设置状态行和响应头
    res.writeHead(200,{
        'Content-Type':'text/html;charset=UTF-8'
    })

    //通过write设置响应主体，允许执行多次
    res.write('hello nodejs,你好');

    //终止响应
    res.end();
})