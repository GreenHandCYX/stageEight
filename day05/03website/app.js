let express= require('express');

//中间件,使用body-parser来处理post方法的传递的参数
let bodyParser = require('body-parser');



let app = express();


app.listen(3000);

app.set('view engine','xtpl');
app.set('views','./views');

app.use(express.static('./public'));


//使用中间件来解析post的数据，
//用body-parser的urlencoded方法解析application/x-www-form-url-encoded后
//中间件会在req上添加一个body属性来存储数据,即req.body
app.use(bodyParser.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    // console.log(req.headers);
    //在express中直接使用req.query来获得地址参数
    console.log(req.query);
    res.render('index',{})
})
app.get('/doc',(req,res)=>{
    res.render('doc',{})
})
app.get('/blog',(req,res)=>{
    res.render('blog',{})
})

app.get('/test',(req,res)=>{
    res.render('test',{})
})
app.post('/',(req,res)=>{
    // console.log(req.headers);
    //express中解析post的参数需要中间件body-parser
    console.log(req.body);
    //body-parser是一个第三方模块
    res.send('post method')

})

