"use strict";

var gulp = require('gulp')
  , nodemon = require('gulp-nodemon')
  , jshint = require('gulp-jshint')
  , karmaServer = require('karma').server
  , webdriver_standalone = require("gulp-protractor").webdriver_standalone
  , webdriver_update = require('gulp-protractor').webdriver_update
  , protractor = require("gulp-protractor").protractor
  , browserify = require('gulp-browserify')
  , rename = require('gulp-rename')
  , BUNDLE = 'bundle.js';

gulp.task('hint', function () {
  gulp.src(['client/app/*.js', 'client/app/**/*.js', 'client/app/common/**/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('browserify', function() {
  // Single entry point to browserify
  gulp.src('client/app/app.js')
    .pipe(browserify({
      insertGlobals : true,
      debug: true
    }))
    .pipe(rename(BUNDLE))
    .pipe(gulp.dest('./server/public/js'))
});

gulp.task('develop', ['browserify', 'hint'], function () {
  nodemon({ script: 'server/index.js', ext: 'js html css', ignore: [BUNDLE] })
    .on('change', ['browserify', 'hint'])
    .on('restart', function () {
      console.log('restarted!')
    })
});

// Strangely, these tests run twice only the first time, then karma is fine.
// It doesn't matter where I depend on this task.
gulp.task('tdd', function(done) {
  karmaServer.start({
    configFile: __dirname + '/karma.conf.js'
  }, done);
});

gulp.task('default', ['develop', 'tdd']);

// Protractor not yet tied into build/development process
gulp.task('webdriver_standalone', webdriver_standalone);
gulp.task('webdriver_update', webdriver_update);

gulp.task('aat', ['webdriver_update'], function(cb) {
  gulp.src(['test/aat/*.spec.js']).pipe(protractor({
    configFile: 'protractor.conf.js'
  })).on('error', function(e) {
    console.log(e);
  }).on('end', cb);
});
