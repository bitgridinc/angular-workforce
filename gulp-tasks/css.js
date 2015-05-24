"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var debug = require('gulp-debug');

module.exports = function(paths) {
  return function() {
    var sassConfig = {
      includePaths: [
        paths.client.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
        paths.client.bowerDir + '/fontawesome/scss'
      ],
      outFile: paths.server.cssDir + '/app.css'
    };
    return gulp.src(paths.client.allSassSrc)
               .pipe(debug({title: 'sass:'}))
               .pipe(sass(sassConfig).on('error', sass.logError))
               .pipe(gulp.dest(paths.server.cssDir));
  }
};
