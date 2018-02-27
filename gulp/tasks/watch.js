var gulp = require('gulp'),
watch = require('gulp-watch'),
sass = require('gulp-sass'),
sourcemaps = require('gulp-sourcemaps'),
autoprefixer = require('gulp-autoprefixer'),
browserSync = require('browser-sync').create();

//  variables
var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};
var cssOutput = "./css/styles.css";



gulp.task('styles', function() {
  return gulp
    .src('sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./css/maps'))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest('./css'));
});


gulp.task('watch', function() {

  browserSync.init(["css/*.css"], {
    notify: false,
    server: {
      baseDir: "./"
    }
  });

});

gulp.task('cssInject', ['styles'], function() {
  return gulp.src(cssOutput)
    .pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', ['scripts'], function() {
  browserSync.reload();
});

gulp.task('default', ['styles', 'watch'], function() {
  watch('./index.html', function() {
    console.log("Reloading because of change in HTML.")
    browserSync.reload();
  });

 // watch('./**/*.js', function() {
   // gulp.start('scriptsRefresh');
 // });

  watch('./**/*.scss', function() {
    console.log("Reloading because of change in CSS.")
    gulp.start('cssInject');
  });
});