var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
const sourcemaps = require("gulp-sourcemaps");
var cssnano = require('cssnano');
var cleanCSS = require('gulp-clean-css');

gulp.task('default', function () {
  return gulp.watch('scss/**/*.scss', gulp.series('styles'));
});

gulp.task('styles', function () {
  var processors = [
    autoprefixer(),
    cssnano()
  ];
  return gulp.src('scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('output/maps/'))
    .pipe(gulp.dest('output/css/'));
});