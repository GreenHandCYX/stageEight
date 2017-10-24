// syntax语法
var str = 'hello world';
console.log(str);

var arr =['html','js','css'];
console.log(arr)


var obj ={name:'小米',age:20};
console.log(obj);



function sayHi(arg){
    console.log('你好'+arg)
}
sayHi('小红');


for (var i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}


for (var key in obj) {
   console.log(key+':'+obj[key])
}


// dom和bom是浏览器渲染环境扩展的，所以在nodejs中不可用dom和bom对象