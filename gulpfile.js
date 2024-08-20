const { src, dest, series, watch } = require('gulp');
const gulp = require('gulp');

const del = require('del');

const htmlmin = require('gulp-htmlmin');

const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer')

const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');

const browserSync = require('browser-sync').create();




const clean = () => {
    return del(['build/*'])
}

function buildStyles() {
    return gulp.src('./app/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false,
        }))

        .pipe(cleanCSS({ level: 1 }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
}

const scripts = () => {
    return src(
        ['./app/js/**.js'])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('main.js'))
        .pipe(uglify().on("error", notify.onError()))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./build/js'))
        .pipe(browserSync.stream());
}

const images = () => {
    return src(
        ['./app/images/**/*',])
        .pipe(dest('./build/images'))
};

const htmlGo = () => {
    return src('app/index.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(dest('build'))
        .pipe(browserSync.stream())
}

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: "./build"
        },
    });

    watch('./app/scss/**/*.scss', buildStyles);
    watch('./app/*.html', htmlGo);
    watch('./app/js/**/*.js', scripts);
    watch('./app/images/**', images);
}

exports.buildStyles = buildStyles;
exports.clean = clean
exports.htmlGo = htmlGo;



exports.default = series(clean, scripts, buildStyles, images, htmlGo, watchFiles);
