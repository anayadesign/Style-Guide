const gulp = require('gulp');
const sass = require('gulp-ruby-sass');
//serve it
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

gulp.task('sass', () =>
    sass('./sass/**/*.scss')
        .on('error', sass.logError)
        .pipe(gulp.dest('css'))
);

gulp.task('sass-watch', ['sass'], function(done) {
    gulp.watch('./sass/**/*.scss', ['sass']);
    browserSync.reload();
    done();
});

gulp.task('serve', ['sass'], function() {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
  gulp.watch("./sass/**/*.scss", ['sass-watch']);
});
