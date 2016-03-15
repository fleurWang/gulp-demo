var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var browserify = require('gulp-browserify');//js模块化开发

var dest = 'dist';//发布目录名

var path = {
	js: 'src/js/*.js',
	css: 'src/css/*.css',
	html: 'src/**/*.html'
};

//启动服务器的插件  和gulp集成 
gulp.task('connect', ['compile'] , function(){
	browserSync({
		notify: false,
		port: 9000,
		server:{
			baseDir: [dest]
		}
	});

	//watch for changes
	gulp.watch(path.js,function(){
		gulp.start('script');
		reload();
	});

	gulp.watch(path.css,function(){
		gulp.start('css');
		reload();
	});

	gulp.watch(path.html,function(){
		gulp.start('html');
		reload();
	});

});

gulp.task('script',function(){
	return gulp.src(path.js)
		.pipe(browserify())
		.pipe(gulp.dest(dest + '/js'));
});

gulp.task('css',function(){
	return gulp.src(path.css)
		.pipe(gulp.dest(dest + '/css'));
});

gulp.task('html',function(){
	return gulp.src(path.html)
	    .pipe(gulp.dest(dest));
});

//清除缓存
gulp.task('clean', require('del').bind(null, [dest]));

gulp.task('compile',['script','css','html']);

gulp.task('server', ['clean'], function(){
	gulp.start('compile');
	gulp.start('connect');
});