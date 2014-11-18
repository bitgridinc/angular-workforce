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
  gulp.src('./client/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('browserify', function() {
  // Single entry point to browserify
  gulp.src('client/js/app.js')
    .pipe(browserify({
      insertGlobals : true
    }))
    .pipe(rename(BUNDLE))
    .pipe(gulp.dest('./server/public/js'))
});

gulp.task('develop', ['browserify', 'hint'], function () {
  nodemon({ script: 'server/index.js', ext: 'html js', ignore: [BUNDLE] })
    .on('change', ['browserify', 'hint'])
    .on('restart', function () {
      console.log('restarted!')
    })
});

gulp.task('tdd', function(done) {
  karmaServer.start({
    configFile: __dirname + '/karma.conf.js'
  }, done);
});

gulp.task('default', ['develop', 'tdd']);

// Protractor not yet tied into build/development process
gulp.task('webdriver_standalone', webdriver_standalone);
gulp.task('webdriver_update', webdriver_update);

gulp.task('protractor', ['webdriver_update'], function(cb) {
  gulp.src(['test/e2e/*.spec.js']).pipe(protractor({
    configFile: 'protractor.conf.js'
  })).on('error', function(e) {
    console.log(e);
  }).on('end', cb);
});
