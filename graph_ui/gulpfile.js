var gulp = require('gulp');
var browserify = require('browserify');
var babel = require('gulp-babel');
var source = require('vinyl-source-stream');

gulp.task('default', function () {
  browserify("js/app.js")
  .transform('babelify', {
    presets: ['es2015', 'react']
  })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('build'));
});