"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass')(require('node-sass'));
var sourcemaps = require("gulp-sourcemaps");
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var gutil = require( 'gulp-util' );
var plumber = require("gulp-plumber");

// CSS 
function css_file() {
    return gulp
      .src("./assets/scss/**/*.scss")
      .pipe(plumber())
      .pipe(sass({ outputStyle: "compressed" }))
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest("./build/css/"))
  }
// JS 
function js_file() {
    return gulp.src('./assets/js/main.js')
      .pipe(uglify())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('./build/js/'))
  }
  // Watch files
function watchFiles() {
    gulp.watch("./assets/scss/**/*.scss",  css_file);

    gulp.watch("./assets/js/main.js",  js_file);
}
// define complex tasks
var build = gulp.series( gulp.parallel( css_file,js_file  ) );
var watch = gulp.parallel( watchFiles );

gulp.task('default', watch);