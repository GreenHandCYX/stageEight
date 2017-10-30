
let express = require('express');

let app = express();

app.listen(3000);

app.set('views','./views');

app.set('view engine','xtpl');

app.use(express.static('./public'));

//在express设计了中间件，指在请求和响应的中间阶段对响应和请求做出处理的逻辑

//通过use方法来实现中间件的调用
//use方法可以支持两个参数,第一个是路由,默认不写指所有路由,第二个是一个回调函数
app.use((req,res,next)=>{
    //next指传向下一阶段,只有传到下一阶段，这一阶段定义的属性才可访问到
    //如果不调用那么下一中间件会持续等待
    req.cyx = '柴益新';
    res.age = 16;
    next();
    
});

//中间件的本质是一个函数，此函数可以自动接受到请求和响应，并且可在函数内部对请求和响应作处理
//常见写法，伪代码
// function static(){
//     return function(req,res){

//     }
// }
// app.use(static());


// //关于next
// app.use(function(req,res,next){
//     next();
//     //next将请求和响应传递给下一中间件，
//     //如果不调用那么下一中间件会持续等待
// })


//关于顺序
app.use((req,res,next)=>{
    console.log(req.cyx);
    console.log(res.age);
    next();
})

//中间件支持路由
app.use('/add',(req,res,next)=>{
    req.demo = '测试';
    req.text = '测试1';
    next();
})
//表示所有路由
// app.use(()=>{});

app.get('/',(req,res)=>{
    console.log(req.cyx);
    console.log(res.age);
    
    console.log(req.demo);
    console.log(res.text);
    res.render('index',{})
})

app.get('/add',(req,res)=>{
    
    console.log(req.demo);
    console.log(res.text);
    res.render('index',{})
})