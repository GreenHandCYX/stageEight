// let http = require('http');

// let url =require('url');

// let queryString = require('querystring');


// let server = http.createServer();



// server.listen(3000,(err)=>{
//     if(!err){
//         console.log('服务器已启动，监听3000端口');
//     } 
// });
// server.on('request',(req,res)=>{
    

// //请求
//     //1.请求行 请求方式+请求地址
//         //通过req.method获取请求方式
//         // console.log('您的请求方式为'+req.method)
//         // //通过req.url可以获取请求地址
//         // console.log('您的请求地址为'+req.url)

//     //2.请求头 键值对
//         //通过req.headers可以获取请求头
//         // console.log('您的请求头为',req.headers)
//     //3.请求主体 get方式为空 post可以有
//     //     //当请求方式为post时才会有请求主体（主要是参数）
//         //a.当数据以post方式上传时会触发一个事件data
//             var formData = '';
//             req.on('data',(chunk)=>{
//                 console.log(chunk);//返回一个buffer类型(缓存类型)
//                 formData += chunk;
//             })
//             //当post数据传输完毕时会触发另一个事件end
//             req.on('end',()=>{
//                 console.log(formData)
//                 //得到的数据为一个字符串,使用不方便
//             //可以使用系统模块queryString来解析;
//             let params = queryString.parse(formData);
//             console.log(params);
//             })
           

            

//     //  //b.当请求方式为get时没有请求主体（参数在地址上）

//             // //如果get方式请求可以通过地址的解析获取参数
//             //     //nodejs中的url系统模块可用来专门处理地址上的参数
//                 let params = url.parse(req.url,true)
//                 console.log(params)
//     res.end();
// })





let http = require('http');
let url = require('url');
let querystring =require('querystring');
let server = http.createServer();


server.listen(3000,(err)=>{
    if(!err){
        console.log('服务器已启动')
    }
})


server.on('request',(req,res)=>{
    console.log('我是请求地址',req.url);
    console.log('我是请求方式',req.method);
    console.log('我是请求头',req.headers);
    console.log('我是get处理过的请求参数',url.parse(req.url,true).query);


    var postdata = '';
    req.on('data',(chunk)=>{
        postdata += chunk
    })

    req.on('end',()=>{
        console.log('我是未处理的post请求参数',postdata);
        console.log('我是处理过的post请求参数',querystring.parse(postdata));
        
    })




    res.writeHeader(200,{
        'Content-Type':'text/html;charset=UTF-8'
    });
    res.write('响应主体');
    res.end();
})




var http =require('http')
var url = require('url')
var querystring = require('querystring')
var app = http.createServer()
app.listen(3000,err=>{
	console.log(err);
	if(!err){
		
	}
})
app.on('request',function(req,res){
	
	req.method
	req.url
	req.headers
	
	url.parse(req.url,true).query
	var postdata = '';
	req.on('data',chunk=>{
		postdata+=chunk
	})
	req.on('end',()=>{
		querystring.parse(postdata)
	})
	
	res.writeHeader(200,{
		'Content-Type':'text/html;caharset=UTF-8'
	})
	res.write('响应主体')
	res.end()
	
	
})
