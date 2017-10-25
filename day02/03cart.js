//仅仅以.js结尾不能完全意义上称为一个模块
//只是nodejs将其对待成了模块
//而没有封装功能供其他人使用

let version = '1.0.0';


function addCart(){
    //假设通过addCart添加购物车
    console.log('添加成功')
}
function deleteCart(){
    //假设通过deleteCart删除购物车
}
function modifyCart(){
    //假设通过 modifyCart修改购物车
}


//将方法定义好需要公开出去
//使用return不符合语法，

//1.nodejs新增了一个专门将模块内部函数或变量公开的对象module.exports

// module.exports.addCart = addCart;
// module.exports.deleteCart = deleteCart;
// module.exports.modifyCart = modifyCart;
// module.exports.version = version;


//模块的返回值就是moulde.exports



//2.在nodejs中除了使用moulde.exports外还提供了一个exports来提供与moulde.exports类似的功能
//相当于exports = module.exports

// exports.addCart = addCart;
// exports.deleteCart = deleteCart;
// exports.modifyCart = modifyCart;
// exports.version = version;


//重新赋值了与module.exports无关了所以也不能将模块内的数据公开给外部
// exports = {
//     addCart:addCart,
//     deleteCart:deleteCart,
//     modifyCart:modifyCart,
//     abc:version
// }