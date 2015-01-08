"use strict";

var gulp = require('gulp')
  , nodemon = require('gulp-nodemon')
  , jshint = require('gulp-jshint')
  , karmaServer = require('karma').server
  , webdriver_standalone = require("gulp-protractor").webdriver_standalone
  , webdriver_update = require('gulp-protractor').webdriver_update
  , protractor = require("gulp-protractor").protractor
  , browserify = require('gulp-browserify')
  , rename = require('gulp-rename');

var config = {
  clientModuleSrc: 'client/app/**/*.js',
  clientCommonSrc: 'client/common/**/*.js',
  clientEntrySrc: 'client/app/_application/app.js',
  clientAatSrc: 'client/app/**/aat/*aat.js',
  bundleFileName: 'bundle.js',
  bundleFolder: 'server/public/js',
  serverSrc: 'server/index.js'
};

gulp.task('hint', function () {
  gulp.src([config.clientModuleSrc, config.clientCommonSrc])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('browserify', function() {
  // Single entry point to browserify
  gulp.src(config.clientEntrySrc)
    .pipe(browserify({
      insertGlobals : true,
      debug: true
    }))
    .pipe(rename(config.bundleFileName))
    .pipe(gulp.dest(config.bundleFolder))
});

gulp.task('develop', ['browserify', 'hint'], function () {
  nodemon({ script: config.serverSrc, ext: 'js html css', ignore: [config.bundleFileName] })
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
  gulp.src([config.clientAatSrc]).pipe(protractor({
    configFile: 'protractor.conf.js'
  })).on('error', function(e) {
    console.log(e);
  }).on('end', cb);
});
