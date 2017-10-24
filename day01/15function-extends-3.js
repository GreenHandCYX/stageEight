var arr = Array.of('a','b','c');
//将数组拆分输出而不是以数组的形式输出
console.log(...arr);
//相当于console.log('a','b','c');

function fn(a,b,c){
    console.log(a,b,c);
}
fn(...arr);
//相当于console.log(arr[0],arr[1],arr[2]);