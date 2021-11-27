const { src, dest, watch } = require('gulp'); //con llaves se extraen multiples funciones
const sass = require('gulp-sass')(require('sass'));

function css(done) {
    //identificar el archivo .SCSS a compilar
    src('src/scss/app.scss')
        .pipe(sass()) //compilar
        .pipe(dest('build/css')) //Almacernarla en el disco duro
    done();
}

function dev(done) {
    watch('src/scss/app.scss', css);
    done();
}
exports.css = css;
exports.dev = dev;