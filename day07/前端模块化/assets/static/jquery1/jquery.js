function jQuery(){
    return {
        css:function(){
            console.log('我是css方法')
        },
        attr:function(){

        }
    }
}
var $ = jQuery;


define(function(){
    return $;
})