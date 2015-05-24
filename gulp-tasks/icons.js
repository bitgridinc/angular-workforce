"use strict";

var gulp = require('gulp');

module.exports = function(paths) {
  return function() {
    var iconPaths = [
      paths.client.bowerDir + '/fontawesome/fonts/**.*',
      paths.client.bowerDir + '/bootstrap-sass-official/assets/fonts/bootstrap/**.*'
    ];
    return gulp.src(iconPaths)
               .pipe(gulp.dest(paths.server.fontsDir));
  }
};
