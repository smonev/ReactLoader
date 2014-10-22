var gulp = require('gulp');
var react = require('gulp-react');
var scripts = 'src/*.js';
var index = 'src/demo.html';

gulp.task('jsx', function () {
  return gulp.src(scripts)
    .pipe(react())
    .pipe(gulp.dest('build/js'))
});

gulp.task('index', function () {
  return gulp.src(index)
    .pipe(gulp.dest('build'));
});

gulp.task('watch', function () {
  gulp.watch(index, ['index']);
  gulp.watch(scripts, ['jsx']);
});

gulp.task('default', ['watch', 'jsx', 'index']);
