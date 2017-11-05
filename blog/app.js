let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let session = require('express-session');


app.listen(3000,(err)=>{
    if(!err){
        console.log('服务已启动')
    }
});

app.set('views','./views');
app.set('view engine','xtpl');


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))

app.use('/admin',(req,res,next)=>{
    if(!req.session.loginInfo && req.url!='/login'){
        return res.redirect('/login');
    }
    next();
})



let admin = require('./routes/admin');
let home = require('./routes/home');

app.use('/admin',admin);
app.use('/',home);


