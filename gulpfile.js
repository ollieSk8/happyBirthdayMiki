/**
 * @file gulpfile
 * @version 1.0
 * @author ollie
 */
// Load plugins
'use strict';
var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    notify       = require('gulp-notify'),
    watch        = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    babel        = require('gulp-babel'),
    fontSpider   = require( 'gulp-font-spider');



    

gulp.task( 'fontspider', function(){
    return gulp.src( './index.html' )
        .pipe( fontSpider() );
});
//build-css
gulp.task('build-css', function(){
  return gulp.src('./sass/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
     }))
    .pipe(gulp.dest('./css'))
    .pipe(notify({ message: 'build-css task complete' }));
});
//es6 to es5
gulp.task('es6-to-es5',function(){
    return gulp.src('scripts/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('js'));
});
//gulp watch
gulp.task('watch',function(){
    gulp.watch(['sass/*.scss'], ['build-css']);
});