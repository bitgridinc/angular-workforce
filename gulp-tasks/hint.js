"use strict";

var gulp = require('gulp');
var jshint = require('gulp-jshint');

module.exports = function(paths) {
  gulp.src([paths.client.moduleSrc, paths.client.commonSrc])
    .pipe(jshint(paths.configs.jshint))
    .pipe(jshint.reporter('jshint-stylish'));
};
