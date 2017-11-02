let http = require("http");

let url = require('url');

let path = require('path');

let fs = require('fs'); 

let template =require('art-template');
//设置查找路径（即参考路径）
template.defaults.root = './views';
//设置默认后缀
template.defaults.extname = '.html';


//读取json文件信息,会自动将json字符串处理为一个数组
let data = require('./database/students.json');


let server = http.createServer();

server.listen(3000,(err)=>{
    if(!err){
        console.log('服务器已成功启动')
    }
})

server.on('request',(req,res)=>{
    //获取路由地址
    let {pathname} = url.parse(req.url);
    
    //此时的路径带/需要处理为./public
    let realPath = path.join('./public',pathname);
    
    //创建渲染方法
    res.render = function(index,data){
        //调用模板引擎的方法
        let html = template(index,data);
        //相当于res.write(data) res.end()
        res.end(html);
    }


    //设置路由
    switch (pathname) {
        case '/':
        case '/add':
            res.render('add',{})
            break;
        case '/list':
            res.render('list',{list:data})
            break;
        case '/create':
            //处理前端提交的数据放入读取的json文件的数组中再写入json文件
            //获取get方式提交的数据
            let {query} = url.parse(req.url,true);
            //放入读取到的数组中
            data.push(query);
            //写入json文件，注意此时数据必须转为JSON格式的字符串
            fs.writeFile('./database/students.json',JSON.stringify(data),(err)=>{
                if(!err){
                    //写入成功后跳转到列表页
                    //设置状态码为302并设置对应响应头
                    res.writeHeader(302,{
                        "Location":'/list'
                    })
                }
                res.end();
            })
        break;
        case '/delete':
            //删除指定数据
            let id =  url.parse(req.url,true).query.id;
            //删除读取的json数组中指定单元
            data.splice(id,1);
            //将处理后的数据重新放入json文件
            fs.writeFile('./database/students.json',JSON.stringify(data),(err)=>{
                if(!err){
                    //写入成功后跳转到list页面
                    res.writeHeader(302,{
                        "Location":'/list'
                    })
                }
                res.end();
            })
            break;
        default:
        //处理图片css,js等文件
            fs.readFile(realPath,(err,data)=>{
                if(!err){
                    res.end(data)
                }
            })
            break;
    }

})