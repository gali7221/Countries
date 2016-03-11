// Include gulp
var gulp = require('gulp'); 
var connect = require('gulp-connect');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');

gulp.task('connect', function() {
  connect.server({
    root: 'app/'
  });
});

// Default Task
gulp.task('default', ['connect']);


gulp.task('copy-html-files', function() {
     gulp.src(['./app/**/*.html', './app/capitals.json', '!./app/index.html'], {base: './app'})
    .pipe(gulp.dest('build/'));
});

gulp.task('usemin', function() {
  gulp.src('./app/index.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat', rev()],
      js: [uglify({mangle: false}), rev()]
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('build', ['copy-html-files', 'usemin']);