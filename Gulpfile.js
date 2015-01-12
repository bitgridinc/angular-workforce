"use strict";

var gulp = require('gulp')
  , nodemon = require('gulp-nodemon')
  , jshint = require('gulp-jshint')
  , karmaServer = require('karma').server
  , webdriver_standalone = require("gulp-protractor").webdriver_standalone
  , webdriver_update = require('gulp-protractor').webdriver_update
  , protractor = require("gulp-protractor").protractor
  , browserify = require('browserify')
  , transform = require('vinyl-transform')
  , rename = require('gulp-rename')
  , sass = require('gulp-ruby-sass')
  , notify = require('gulp-notify');

var config = {
  clientModuleSrc: 'client/app/**/*.js',
  clientCommonSrc: 'client/common/**/*.js',
  clientEntrySrc: 'client/app/_application/app.js',
  clientAatSrc: 'client/app/**/aat/*aat.js',
  clientBowerDir: 'client/bower_components',
  clientSassDir: 'client/resources/sass',
  bundleFileName: 'bundle.js',
  bundleFolder: 'server/public/js',
  publicFontsFolder: 'server/public/fonts',
  serverSrc: 'server/index.js'
};

gulp.task('hint', function () {
  gulp.src([config.clientModuleSrc, config.clientCommonSrc])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('css', function() {
  return gulp.src(config.clientSassDir + '/test.scss')
    .pipe(sass({
        style: 'compressed',
        loadPath: [
          config.clientSassDir,
          config.clientBowerDir + '/bootstrap-sass-official/assets/stylesheets',
          config.clientBowerDir + '/fontawesome/scss'
        ]
      })
      .on('error', notify.onError(function(error) {
        return 'Error: ' + error.message;
      }))
    )
    .pipe(gulp.dest('./server/public/css'));
});

gulp.task('browserify', function() {
  var browserified = transform(function(filename) {
    var b = browserify(filename);
    return b.bundle();
  });

  return gulp.src([config.clientEntrySrc])
             .pipe(browserified)
             .pipe(rename(config.bundleFileName))
             .pipe(gulp.dest(config.bundleFolder));
});

gulp.task('develop', ['css', 'browserify', 'hint'], function () {
  nodemon({ script: config.serverSrc, ext: 'js html css scss', ignore: [config.bundleFileName] })
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

gulp.task('icons', function() {
  return gulp.src(config.clientBowerDir + '/fontawesome/fonts/**.*')
    .pipe(gulp.dest(config.publicFontsFolder));
});

gulp.task('default', ['develop', 'tdd', 'icons']);

// Protractor not yet tied into build/development process
gulp.task('webdriver_standalone', webdriver_standalone);
gulp.task('webdriver_update', webdriver_update);

gulp.task('aat', ['webdriver_update'], function(cb) {
  gulp.src([config.clientAatSrc]).pipe(protractor({
    configFile: 'protractor.conf.js'
  })).on('error', notify.onError(function(error) {
    return "Error: " + error.message;
  })).on('end', cb);
});
