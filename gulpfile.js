const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const buildStyles = function () {
  return src('sass/**/*.scss')
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(dest('public/assets/css'));
}

const watchTask = function () {
  watch(['sass/**/*.scss'], buildStyles);
}

exports.default = series(buildStyles, watchTask)
