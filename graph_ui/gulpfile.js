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

// Rerun the task when a file changes
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(files.js, ['dev']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'dev']);