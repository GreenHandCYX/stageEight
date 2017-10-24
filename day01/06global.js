//全局对象相当于浏览器的window
// console.log(global);


setTimeout(function(){
    console.log('我是setTimeout')
},2000)

var i=0;
setInterval(function(){
    console.log(i);
    i++
},2000)