let queryString = require('querystring');


exports.urlencoded = function(){
    //解析处理post数据
    return function(req,res,next){
        let text = '';
        req.on('data',(chunk)=>{
            text += chunk
        })
        req.on('end',()=>{
            req.body =  queryString.parse(text);
            next();
        })
    }
}