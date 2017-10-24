//http是一个系统模块,通过http模块可以创建一个http服务器
//类似于Apache


//通过一系列方法来创建
//例如方法 createServer


let http = require('http');


let url = require('url');


// 通过createServer创建服务器实例
let server = http.createServer();
//通过 服务器实例 来处理请求和响应


//get/post url


//get + localhost:端口号(可自定义，常为3000)


//通过服务器实例的 listen方法 来实现端口的监听
 server.listen(3000);

 //通过服务器实例的request事件来处理客户端(浏览器)的请求
 //并根据情况做出响应
 //通过 on 方法来实现事件的监听
 server.on('request',(req, res) => {
     console.log('有人来访问了');

    // console.log(req)
    // console.log(req.headers);//请求头
    // console.log(req.url);获取get传递的参数
    // 处理请求参数
    console.log(url.parse(req.url,true));


     //在回调函数中可以设置两个参数,分别对应请求(req)和响应(res)
     //req表示请求相关
     //res表示响应相关

     //设置响应头(编码)
     //响应头和状态行
     res.writeHead('200',{
         'Content-Type':'text/html;charset=UTF-8'
     });
     //响应主题
     res.write('hello browser');
     res.write('哈哈');


     //表示响应结束
     res.end();
 })

 //每当修改了nodejs代码后,需要重新启动

