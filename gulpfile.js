const gulp = require('gulp');
const bs = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const cleancss = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');

// gulp serve
// Carrega servidor para desenvolvimento
function serve(){
    gulp.src('css/**/*.css')
        .pipe(concat('index.css'))
        .pipe(gulp.dest('./'));

    gulp.src('js/**/*.js')
        .pipe(concat('index.js'))
        .pipe(gulp.dest('./'));

    // inicia servidor
    bs.init({
        server: {
            baseDir: "./"
        },
        port: 8080,
        open:false,
        notify:false,
    });

    // observa modificações em hml, css e js
    gulp.watch('css/**/*.css', () => {
        return gulp.src('css/**/*.css')
            .pipe(concat('index.css'))
            .pipe(gulp.dest('./'))
            .pipe(bs.stream());
    });
    gulp.watch('js/**/*.js', () => {
        return gulp.src('js/**/*.js')
            .pipe(concat('index.js'))
            .pipe(gulp.dest('./'))
            .pipe(bs.stream());
    });

    // Não funciona a partir da segunda modificação ¯\_(ツ)_/¯
    gulp.watch(['index.html']).on('change', () => bs.reload());
    gulp.watch(['store.js']).on('change', () => bs.reload());
};

async function build(){
    await gulp.src('css/**/*.css')
        .pipe(concat('index.css'))
        .pipe(cleancss())
        .pipe(gulp.dest('dist'));
    await gulp.src('js/**/*.js')
        .pipe(concat('index.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
    await gulp.src('store.js')
        .pipe(concat('store.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
    await gulp.src('manifest.json')
        .pipe(concat('manifest.json'))
        .pipe(gulp.dest('dist'));
    await gulp.src('service-worker.js')
        .pipe(concat('service-worker.js'))
        .pipe(gulp.dest('dist'));
    await gulp.src('img/**/*')
        .pipe(gulp.dest('dist/img'));
    await gulp.src('index.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
}

exports.build = build
exports.serve = serve
