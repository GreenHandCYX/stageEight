let express = require('express');
let app = express();
app.listen(3000);


app.set('views','./views');
app.set('view engine','xtpl');

app.use(express.static('./public'));

app.get('/',(req,res)=>{
    res.render('index',{
        title:'这是首页',
        active:'网站首页',
        navs:[
            '网站首页',
            '文章一览',
            '系列专题',
            '神奇海螺',
            '次炭酸钴'
        ]
    })
})


app.get('/article',(req,res)=>{
    res.render('article',{
        title:'这是文章页',
        active:'文章一览',
        navs:[
            '网站首页',
            '文章一览',
            '系列专题',
            '神奇海螺',
            '次炭酸钴'
        ]
    })
})