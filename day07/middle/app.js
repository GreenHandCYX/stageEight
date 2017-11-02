let express = require('express');
let app = express();
app.listen(3001);
app.get('/',(req,res,next)=>{
req.aaa = 'hhh'
next();
},(req,res)=>{
req.send('ok')
})