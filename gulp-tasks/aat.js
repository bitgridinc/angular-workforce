"use strict";

var gulp = require('gulp');
var protractor = require('gulp-protractor').protractor;

module.exports = function(paths) {
  return function(cb) {
    gulp.src(paths.client.aatSrc).pipe(protractor({
      configFile: paths.configs.protractor
    })).on('error', function(error) {
      console.log('Error in AAT task: ', error);
      process.exit(1);
    }).on('end', cb);
  }
};
