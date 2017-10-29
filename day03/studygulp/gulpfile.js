var gulp = require('gulp');

var less = require('gulp-less');

var concat = require('gulp-concat');

//可以将压缩css作为一个任务
//也可将less转成css当成一个任务
//也可以将js进行合并当成一个任务

//通过本地安装的gulp制定任务

//将less转为css
gulp.task('less2css',function(){
    //只要将任务执行就可以实现了
    console.log('css转换成功');
    //通过gulp.src指定需要将那些资源进行转换(路径)
    //通过模块gulp-less来实现真正的转换,需要通过pipe传递给less,再通过gulp.dest将处理后的文件放置在./css文件（不存在该文件会自动创建）下
    gulp.src('./less/*.less').pipe(less()).pipe(gulp.dest('./css'));
   
})
//合并js
gulp.task('hebing',function(){
    //将你要执行的任务代码放在这
     //通过gulp.src指定需要合并的资源(路径)
     //通过模块gulp-concat可以实现js的合并
     gulp.src('./libs/*.js').pipe(concat('a.js')).pipe(gulp.dest('./js'));

})


//通过全局安装的gulp来执行任务
//命令行:gulp 任务名即可
