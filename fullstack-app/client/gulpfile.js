const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat'); 

gulp.task('sass', function () {
    return gulp.src('./src/scss/**/*.scss') 
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('styles.css')) 
        .pipe(gulp.dest('./src/styles'));
});

gulp.task('watch', function () {
    gulp.watch('./src/scss/**/*.scss', gulp.series('sass')); 
});

gulp.task('default', gulp.series('sass', 'watch'));
