/**
 * Simple gulpfile to build the CSS/JS pieces in development.
 */

const gulp      = require('gulp')
const coffee    = require('gulp-coffee')
const sass      = require('gulp-sass')
const concat    = require('gulp-concat')
const clean     = require('gulp-clean')


// SASS
gulp.task('sass', () => {
    return gulp
        .src([
            'styles/**/*.sass',
            'styles/**/*.scss',
        ])
        .pipe(sass({
            outputStyle: 'expanded',
            sourceComments: true,
            sourcemap: 'none',
        }).on('error', sass.logError))
        .pipe(gulp.dest('./tmp/styles'))
})


// Coffee
gulp.task('coffee', function () {
    return gulp.src('./scripts/**/*.coffee')
        .pipe(coffee({
            bare: false
        }))
        .on('error', function (err) {
            console.log('')
            console.log(err.toString())
            this.emit('end')
        })
        .pipe(gulp.dest('tmp/scripts/'))
})


// CSS copy
gulp.task('css-copy', () => {
    return gulp.src('styles/**/*.css')
        .pipe(gulp.dest('tmp/styles'))
})


// JS copy
gulp.task('js-copy', () => {
    return gulp.src('scripts/**/*.js')
        .pipe(gulp.dest('tmp/scripts'))
})


// tmp clean
gulp.task('tmp-clean', () => {
    return gulp.src('tmp/**/*').pipe(clean())
})
gulp.task('css-clean', () => {
    return gulp.src('tmp/styles/**/*.css').pipe(clean())
})
gulp.task('js-clean', () => {
    return gulp.src('tmp/scripts/**/*.js').pipe(clean())
})


// CSS concat
const cssPipeline = [
    'grid.css',
    'general.css',
    '**/*.css',
    '*.css',
].map(path => `tmp/styles/${path}`)

gulp.task('concat-css', () => {
    return gulp.src(cssPipeline)
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./'))
})


// JS concat
const jsPipeline = [
    'main.js',
    '**/*.js',
    '*.js',
].map(path => `tmp/scripts/${path}`)

gulp.task('concat-js', () => {
    return gulp.src(jsPipeline)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./'))
})



// Build tasks
gulp.task('build-css', gulp.series(
    gulp.parallel('sass', 'css-copy'),
    gulp.series('concat-css')
))
gulp.task('build-js', gulp.series(
    gulp.parallel('coffee', 'js-copy'),
    gulp.series('concat-js')
))


gulp.task('build', gulp.series(
    gulp.series('tmp-clean'),
    gulp.parallel(
        'build-css',
        'build-js',
    ),
))



// Watch task
gulp.task('default', gulp.series(
    gulp.parallel('build'),
    () => {
        const sassWatch = gulp.watch([
            'styles/**/*.sass',
            'styles/**/*.scss',
            'styles/**/*.css',
        ])
        sassWatch.on('change', gulp.series('build-css'))
        // sassWatch.on('add', gulp.series('build-css'))

        const jsWatch = gulp.watch([
            'scripts/**/*.coffee',
            'scripts/**/*.js',
        ])
        jsWatch.on('change', gulp.series('build-js'))
        // jsWatch.on('add', gulp.series('build-js'))
    }
))
