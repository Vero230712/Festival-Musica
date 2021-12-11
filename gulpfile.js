const { src, dest, watch, parallel } = require('gulp'); //con llaves se extraen multiples funciones

//css
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

//javascript
const terser = require('gulp-terser-js');

//imagenes a webp e imagemin
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done) {
    //identificar el archivo .SCSS a compilar
    src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass()) //compilar
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css')) //Almacernarla en el disco duro
    done();
}

//convertir imagenmin
function imagenes(done) {
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))
    done();
}
//convertir a webp
function versionwebp(done) {
    const opciones = { quality: 50 };
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))
    done();
}

//convertir avif
function versionAvif(done) {
    const opciones = { quality: 50 };
    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))
    done();
}

function javascript(done) {
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));
    done()
}

function dev(done) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);
    done();
}
exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes
exports.versionwebp = versionwebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionwebp, versionAvif, javascript, dev); //gulp dev