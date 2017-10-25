var arr1 = ['a','b'];
var arr2 = new Array('a','b');

var arr3 = new Array(2,3);
// var arr3 = new Array(2);
console.log(arr3);

//创建一个新数组,一个参数时也作为数组的单元
var arr4 = Array.of(2,3,4);
console.log(arr4)



//遍历
var arr = ['a','b','c'];
// arr.forEach(function(val,key){
//     console.log(key,val)
// })
//返回满足条件的项
var res = arr.find(function(val,key){
    // console.log(key,val)
    return val > 'a';
})
console.log(res);
//返回满足条件的项的索引
var k = arr.findIndex(function(val,key){
    // console.log(key,val)
    return val > 'a';
})
console.log(k);