let express= require('express');
//创建一个express服务器
let app = express();


//处理url地址可用于access_token验证
let url = require('url');
//时间模块
let moment = require('moment');


//创建一个http服务器
let http = require('http');
//基于express创建一个http服务器
let server = http.createServer(app);

let WebSocket = require('ws');
//创建一个基于http的 WebSocket服务器实例
let wss = new WebSocket.Server({ server });
//监听目标ip的端口 192.168.179.81
server.listen(3002,'192.168.179.81', function listening() {
  console.log('Listening on %d', server.address().port);
});








//  转义html 防止xss 攻击(在前端脚本中书写类似死循环前端也可以执行)  
var escapeHtml = require('escape-html');
//  托管静态资源
app.use(express.static('views'))


//机制:
//普通的http请求，交给express 处理  
// WebSocket请求 交给Websocket处理


//当前访问数
  let count = 0;

//客户端访问当前服务器时作监听，建立访问连接时
wss.on('connection', function connection(ws, req) {
  

  //用于做访问标识
  const location = url.parse(req.url, true);
  // You might use location.query.access_token to authenticate or share sessions
  // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

//给来访客户端响应信息，可以是json格式，易于前端处理
  // ws.send(JSON.stringify({
  // 	tip:'欢迎访问'
  // }));

  //获取每个客户端的页面ip
  const ip = req.connection.remoteAddress;
  //来访时可以广播响应信息
  wss.broadcast('系统消息','欢迎'+ip+'来访',1);



  count ++;



//ws模块内置方法
  //监听客户端发来的消息
  ws.on('message', function incoming(message) {
  		console.log(ws.clients);
  		//将接受到的信息广播给所有用户
  		let {name,msg} = JSON.parse(message);
    
      wss.broadcast(name,msg,2);
      
  	

  }); 
  //ws模块内置方法
  ws.on('close',()=>{
    //客户端断开连接后，应将count--
    count--
  })

});


//封装广播函数
wss.broadcast = function broadcast(name,msg,type) {
    //获取当前消息是服务端还是客户端
    type = type || 1;
	 wss.clients.forEach(function each(client) {
            client.send(JSON.stringify({
              name:name,
              msg:escapeHtml(msg),//防止xss攻击不会解析标签
              count:count,
              time:moment(new Date()).format('YY-MM-DD HH:mm:ss'),//记录当前广播时间
              type:type
            }));
          
      });
};



