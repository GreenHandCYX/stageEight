
//define可以传入一个数组参数，用来指定依赖关系
//Define可以传入一个回调函数
//如果存在依赖关系那么回调函数可以通过形参来接受被依赖模块的返回值，按顺序一一对应
//没有返回值的模块也会在define的回调函数里占一个位置，为了便于阅读代码，一般将没有返回值的模块放在最后加载
//依赖注入
define(['./d','./f','./e'],function(d,fff,ppp){
    console.log('c');

    //d是d模块的返回值
    console.log(d)
    //ppp是e模块的返回值
    console.log(ppp);
    var name = '小明';
    var sayHi = function(){
        console.log('小明')
    }
//公开内部成员
    return {
        name:name,
        sayHi:sayHi
    }
});