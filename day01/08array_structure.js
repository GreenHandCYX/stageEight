// var a = 'a';
// var b = 'b';
// var a = 'a',b='b';

// let  a = 'a',b='b';

//1.基础语法
// var [a,b,c] = ['aa','bb','cc'];
    //相当于var a = 'aa',b='bb',c='cc';
// console.log(a,b,c);

//2.灵活性
// var info = [{name:'小明'},'hello','world'];
// var [obj,h,w] = info;
// console.log(obj);

//注:let声明的变量不允许重复声明


//3.没有对应的时为undefined
// let [a,b,c] =[1,2];
// console.log(a);//1
// console.log(b);//2
// console.log(c);//undefined


//4.特殊类型也可识别
let [a,b,c] =[1,2,null];
// console.log(a);//1
// console.log(b);//2
// console.log(c);//null

//5.多余的数字若要赋给一个变量则要写为...变量（此时该变量为一个数组）
[a,b,...c] = [1,2,3,4,5,6];
console.log(a);//1
console.log(b);//2
console.log(c);//3


//6.
// [a,[b,c],d] = [1,[2,3],4];
// console.log(a);//1
// console.log(b);//2
// console.log(c);//3
// console.log(c);//4



//7.单个字符串也有长度,也可以通过索引一一对应
let [e,f,g] = 'abc';
console.log(e,f,g)//a b c