/**
 * gulpfile.js
 * 
 * @author Andrew Bowler
 */

var gulp = require('gulp');
var browserify = require('browserify');
var babel = require('gulp-babel');
var source = require('vinyl-source-stream');
var livereload = require('gulp-livereload');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');

var files = {
  js: ['./js/*.js'],
};

var paths = {
  build: './build'
};

/**
 * Compiles and minifies all JavaScript files once.
 */
gulp.task('production', function () {
  browserify("js/app.js")
  .transform('babelify', {
    presets: ['es2015', 'react']
  })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(streamify(uglify()))
  .pipe(gulp.dest(paths.build))
  .pipe(livereload());
});

/**
 * Compiles unminified JavaScript for development
 */
gulp.task('dev', function() {
  browserify("js/app.js")
  .transform('babelify', {
    presets: ['es2015', 'react']
  })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest(paths.build))
  .pipe(livereload());
});

/**
 * Watches for changes in the JavaScript and re-runs gulp dev
 */
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(files.js, ['dev']);
});

gulp.task('default', ['watch', 'dev']);
