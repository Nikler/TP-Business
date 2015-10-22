"use strict";

var gulp = require('gulp'),
	rename = require('gulp-rename'),
	minifyCSS = require('gulp-minify-css'),
	autoprefixer = require('gulp-autoprefixer'),
	livereload = require('gulp-livereload'),
	sass = require('gulp-sass'),
    clean = require('gulp-clean'),
    imagemin = require('gulp-imagemin'),
	connect = require('gulp-connect');

// css
gulp.task('css', function() {
	return gulp.src('scss/main.scss')
	.pipe(sass())
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(minifyCSS())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('build/css/'))
    .pipe(connect.reload());
});

// image optimizated
gulp.task('compress', function() {
  gulp.src('img/*')
  .pipe(imagemin())
  .pipe(gulp.dest('build/img'))
});

// html
gulp.task('html', function() {
	gulp.src('index.html')
    .pipe(gulp.dest('build/'))
	.pipe(connect.reload());
});

// connect server & livereload
gulp.task('connect', function() {
  connect.server({
    root: 'build/',
    livereload: true
  });
});

// watch
gulp.task('watch', function() {
	gulp.watch('scss/**/*.scss', ['css'])
	gulp.watch('index.html', ['html'])
});

// Чистка папки build
gulp.task('clean', function () {
    return gulp.src('build/', {read: false})
        .pipe(clean());
});

//build
gulp.task('build', function () {
    gulp.src('fonts/**/*').pipe(gulp.dest('build/fonts/'))
    gulp.src('js/**/*').pipe(gulp.dest('build/js'))
    gulp.src('404.html').pipe(gulp.dest('build/'))
    gulp.src('robots.txt').pipe(gulp.dest('build/'))
    gulp.src('.htaccess').pipe(gulp.dest('build/'))
});

// connect & watch (default)
gulp.task('default', ['connect' ,'html' ,'css' ,'build' ,'compress' ,'watch']);