const gulp = require('gulp');
const gutil = require('gulp-util');
const notify = require ('gulp-notify');
const sass = require('gulp-sass');
//serve it
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
//template it
const fileinclude = require('gulp-file-include');
const rename = require('gulp-rename');
const path = require("path");
var paths = {
  templates: './templates/**'
};

gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('css'))
        .pipe(notify({ message: 'Sass: updated <%= file.relative %>' }))
});

gulp.task('sass-watch', ['sass'], function(done) {
    gulp.watch('./sass/**/*.scss', ['sass']);
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
  gulp.watch("./templates/**/*.html", ['fileinclude']);
  browserSync.reload();
  done();
});

gulp.task('serve', ['sass-watch', 'fileinclude-watch'], function() {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
});
