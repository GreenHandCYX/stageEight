let http =require('http');

let template = require('art-template');
template.defaults.root = './views';
template.defaults.extname = '.html';
let server = http.createServer();
server.listen(3000);
server.on('request',(req,res)=>{
    if(req.method == 'get'){

    }else if(req.method == 'post'){

    }
})