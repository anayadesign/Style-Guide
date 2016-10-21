const gulp = require('gulp');
const gutil = require('gulp-util');
const notify = require ('gulp-notify');
const stylus = require('gulp-stylus');
//serve it
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
//template it
const fileinclude = require('gulp-file-include');
const rename = require('gulp-rename');
const path = require("path");
var paths = {
  templates: './source/templates/**'
};

gulp.task('stylus', function () {
  return gulp.src('./source/stylus/styles.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream())
    .pipe(notify({ message: 'Stylus: updated <%= file.relative %>' }));
});
gulp.task('stylus-watch', ['stylus'], function(done) {
  gulp.watch('./source/stylus/**/*.styl', ['stylus']);
  browserSync.reload();
  done();
});

gulp.task('fileinclude', function() {
    return gulp.src(path.join(paths.templates, '*.tpl.html'))
    .pipe(fileinclude())
    .pipe(rename({
      extname: ""
    }))
    .pipe(rename({
      extname: ".html"
    }))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream())
    .pipe(notify({ message: 'Includes: included', onLast: true }));

});
gulp.task('fileinclude-watch', ['fileinclude'], function(done) {
  gulp.watch("./source/templates/**/*.html", ['fileinclude']);
  browserSync.reload();
  done();
});

gulp.task('serve', ['stylus-watch', 'fileinclude-watch'], function() {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
});
