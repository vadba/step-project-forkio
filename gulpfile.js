const { src, dest, watch, parallel, series } = require('gulp');
const browserSync = require('browser-sync').create();
const rigger = require('gulp-rigger');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const del = require('del');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const clearDist = () => {
    return del(['./dist/*/']);
};
const html = (cb) => {
    src('./src/index.html')
        .pipe(rigger())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('./'))
        .pipe(browserSync.stream());
    cb();
};
const images = (cb) => {
    src('./src/img/**/*.+(png|jpg|gif|svg)')
        .pipe(imagemin())
        .pipe(dest('./dist/img/'));
    cb();
};
const styles = (cb) => {
    src('./src/scss/style.scss')
        .pipe(concat('styles.min.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(autoprefixer({
            overrideBrowserslist: ['> 0.01%'],
            cascade: false
        }))
        .pipe(dest('./dist/css/'))
        .pipe(browserSync.stream());
    cb();
};
const scripts = (cb) => {
    src('./src/js/script.js')
        .pipe(rigger())
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(dest('./dist/js/'))
        .pipe(browserSync.stream());
    cb();
};
const server = () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
};
const watcher = (cb) => {
    watch('./src/**/*.html', html);
    watch('./src/img/**/*.+(png|jpg|gif|svg)', images);
    watch('./src/**/*.scss', styles);
    watch('./src/**/*.js', scripts);
    cb();
};
exports.dev = series(html, images, styles, scripts, parallel(server, watcher));
exports.build = series(clearDist, styles, scripts, images);