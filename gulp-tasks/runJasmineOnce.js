"use strict";

var gulp = require('gulp');
var jasmine = require('gulp-jasmine');

module.exports = function(paths) {
  return function() {
    return gulp.src(paths.server.allSpecSrc)
               .pipe(jasmine());
  }
};
