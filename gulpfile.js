var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleancss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var htmlReplace = require('gulp-html-replace');
var htmlMin = require('gulp-htmlmin');
var del = require('del');
var sequence = require('run-sequence');
var concat = require('gulp-concat');

gulp.task('reload', ()=> {
    browserSync.reload();
});
gulp.task('serve' ,['sass'], ()=> {
    browserSync({
        server: 'src'
    });
    gulp.watch('src/*.html', ['reload']);
    gulp.watch('src/scss/**/*.scss', ['sass']);
});
gulp.task('sass', ()=> {
    return gulp.src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 3 versions']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});
gulp.task('css', ()=> {
    return gulp.src('src/css/**/*.css')
    .pipe(concat('style.css'))
    .pipe(cleancss())
    .pipe(gulp.dest('dist/css'));
} )
gulp.task('js', ()=> {
    return gulp.src('src/js/**/*.js')
    .pipe(concat('sript.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
});
gulp.task('img', function(){
    return gulp.src('src/img/**/*.{jpg,jpeg,png,gif}')
    .pipe(changed('dist/images'))
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
})
gulp.task('html', ()=> {
    return gulp.src('src/*.html')
    .pipe(htmlReplace({
        'css': 'css/style.css',
        'js' : 'js/scripts.js'
    }))
    .pipe(htmlMin({
        sortAttributes:true,
        sortClassName: true,
        collapseWhitespace: true
    }))
    .pipe(gulp.dest('dist/'))
});
gulp.task('clean', ()=> {
    return del(['dist']);
});
gulp.task('build', ()=> {
    sequence('clean', ['html','js','css','img']);
})

gulp.task('default', ['serve']);