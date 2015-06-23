"use strict";

var gulp = require('gulp')
  , ngConstant = require('gulp-ng-constant');

module.exports = function(paths, constants) {
  return function() {
    return ngConstant({
        name: 'modules.generated',
        constants: constants,
        stream: true
      })
      .pipe(gulp.dest(paths.client.generatedDir));
  }
};
