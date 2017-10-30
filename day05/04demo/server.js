let express = require('express');
let app = express();

let bodyParse = require('./bodyparser');

app.set('views','./views');
app.set('view engine','xtpl');

app.listen(3000);

//app.use可以自动将req和res作为实参传入中间进行处理
app.use(bodyParse.urlencoded());



app.get('/',(req,res)=>{
    res.render('index',{})
})
app.post('/add',(req,res)=>{
    res.send(req.body)
})