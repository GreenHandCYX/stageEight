//函数的解构赋值:
//多余的实参可以以数组的形式赋值给...的形参
function sayHi(name,age,...gender){
    console.log(name);
    console.log(age);
    console.log(gender);
}
sayHi('小红',16,'女',98);
sayHi('小红',16,'女',98);