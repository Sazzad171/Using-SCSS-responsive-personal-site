const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');

/* Top level function

gulp.task - define task
gulp.src - point to files to use 
gulp.dest - points to folder to output
gulp.watch - watch  files and folders for changes */

//logs message
gulp.task('message', function(done){
  console.log('Gulp is running...');
  done();
});

// copy html folder
gulp.task('copyHtml', function(done) {
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
    done();
});

// optimize image
gulp.task('imageMin', () =>
  gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
);

// minify js
gulp.task('minify', function(done) {
  gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
    done();
});

// sass
gulp.task('sass', function(done) {
  gulp.src('src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
    done();
});

//show as default
// gulp.task('default', ['message', 'copyHtml', 'imageMin', 'sass', 'minify']);

// watch realtime
gulp.task('watch', function(done) {
  gulp.watch('src/js/*.js', gulp.series('minify'));
  gulp.watch('src/scss/*.scss', gulp.series('sass'));
  gulp.watch('src/*.html', gulp.series('copyHtml'));
  done();
});