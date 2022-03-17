var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'), // Gulp file concatenation plugin
    open = require('gulp-open'), // Gulp browser opening plugin
    connect = require('gulp-connect'), // Gulp web server runner plugin
    del = require('del');
const sourcemaps = require("gulp-sourcemaps");

var configuration = {
  paths: {
      src: {
          html: './src/*.html',
          styles: {
            main: './src/scss/main.scss',
            all: [
              './src/scss/**/*.scss'
            ]
          },
          images: [
              './src/images/**/*.{gif,jpg,png,svg}'
          ],
          assets: './static-assets/**/*'
      },
      dist: './output'
  },
  localServer: {
      port: 3000,
      url: 'http://localhost:3000/'
  }
};

// Process HTML
gulp.task('html', function() {
  return gulp.src(configuration.paths.src.html)
      .pipe(gulp.dest(configuration.paths.dist))
      .pipe(connect.reload());
});

// Process styles
gulp.task('styles', function () {
  var processors = [
    autoprefixer(),
    cssnano()
  ];
  return gulp.src(configuration.paths.src.styles.main)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('maps/'))
    .pipe(gulp.dest(configuration.paths.dist + '/css'))
    .pipe(connect.reload());
});

// Copy images
gulp.task('images', function () {
  return gulp.src(configuration.paths.src.images)
    .pipe(gulp.dest(configuration.paths.dist + '/img'))
    .pipe(connect.reload());
});

// Copy ancillary assets
gulp.task('assets', function () {
  return gulp.src(configuration.paths.src.assets)
    .pipe(gulp.dest(configuration.paths.dist + '/assets'));
});

// Create a web server
gulp.task('connect', async function () {
  return connect.server({
      root: configuration.paths.dist,
      port: configuration.localServer.port,
      livereload: true
  });
});

// Watch the filesystem and reload the website automatically
gulp.task('watch', async function () {
  gulp.watch(configuration.paths.src.html, gulp.series('html'));
  gulp.watch(configuration.paths.src.styles.all, gulp.series('styles'));
  gulp.watch(configuration.paths.src.images, gulp.series('images'));
});

// Clean ouput directory
gulp.task('clean', function() {
  return del([configuration.paths.dist + '/**', '!'+ configuration.paths.dist]);
});

// Build tasks
gulp.task('build', gulp.parallel('html', 'styles', 'images', 'assets'));

// Distribute/production build task
gulp.task('release', gulp.series('clean', 'build'));

// Serve & watch with hot reload
gulp.task('serve', gulp.parallel('connect', 'watch'));

// Default development tasks
gulp.task('default', gulp.series('build', 'serve'));
