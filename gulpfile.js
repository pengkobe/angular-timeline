var gulp = require('gulp');

var Ion1ComponentsDevPath = 'Ion1Demo/www/components/ion-timeline';
var Ion2ComponentsDevPath = 'Ion2Demo/src/components/ion-timeline';

gulp.task('copyIon1_2_src', function() {
  return gulp
    .src([Ion1ComponentsDevPath + '/**/*'])
    .pipe(gulp.dest('src/ion1/'));
});

gulp.task('copyIon2_2_src', function() {
  return gulp
    .src([Ion2ComponentsDevPath + '/**/*'])
    .pipe(gulp.dest('src/ion2/'));
});

gulp.task('copy-scss', function() {
  return gulp.src(['src/*.scss']).pipe(gulp.dest('dist'));
});
