var gulp            = require('gulp'),
    plumber         = require('gulp-plumber'),
    rename          = require('gulp-rename'),
    autoprefixer    = require('gulp-autoprefixer'),
    minifycss       = require('gulp-minify-css'),
    sass            = require('gulp-sass'),
    browserSync     = require('browser-sync');

gulp.task('browser-sync', function() {
    browserSync({
        server: {
             baseDir: "./"
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});


gulp.task('styles', function(){
    gulp.src(['assets/sass/app.scss'])
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
        }}))
        .pipe(sass())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest('assets/css/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('./public/assets/css/'))
        .pipe(browserSync.reload({stream:true}))
});

gulp.task('images', function() {
    gulp.src('assets/images/*')
    .pipe(gulp.dest('./public/assets/images/'));
});


gulp.task('default', ['styles', 'images']);

gulp.task('watch', ['browser-sync', 'default'], function(){
    gulp.watch("assets/sass/**/*.scss", ['styles']);
    gulp.watch("*.html", ['bs-reload']);
});
