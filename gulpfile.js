"use strict";

var gulp = require("gulp");
var connect = require("gulp-connect");
var open = require("gulp-open");
var concat = require("gulp-concat");
var cleanCss = require("gulp-clean-css");
var less = require("gulp-less");
var browserify = require("browserify");
var babelify = require("babelify");
var source = require("vinyl-source-stream");

var config = {
  rootUrl: 'http://localhost',
  port: 3000,
  paths: {
    html: "./src/*.html",
    less: "./src/less/*.less",
    js: "./src/**/*.js",
    mainJs: "./src/main.jsx",
    dist: "./dist"
  }
};

gulp.task('html', function(){
  return gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
    .pipe(connect.reload());
});

gulp.task('connect', function(){
  connect.server({
    root:['dist'],
    port: config.port,
    base: config.rootUrl,
    livereload: true
  });
});

gulp.task('open', ['connect'], function(){
  gulp.src('dist/index.html')
    .pipe(open({ uri: config.rootUrl + ':' + config.port + '/' }));
});

gulp.task('watch', function(){
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.less, ['less']);
});

gulp.task('less', function(){
  return gulp.src(config.paths.less)
    .pipe(less())
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(config.paths.dist + '/css'))
    .pipe(connect.reload());
});

gulp.task('js', function(){
  browserify(config.paths.mainJs)
        .transform(babelify, {presets: ['es2015', 'react']})
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(connect.reload());
});

gulp.task('default',['js', 'html', 'less', 'open', 'watch']);
