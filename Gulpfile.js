"use strict";

var gulp = require('gulp')
  , nodemon = require('gulp-nodemon')
  , jshint = require('gulp-jshint')
  , karmaServer = require('karma').server
  , webdriver_standalone = require("gulp-protractor").webdriver_standalone
  , webdriver_update = require('gulp-protractor').webdriver_update
  , protractor = require("gulp-protractor").protractor
  , watch = require('gulp-watch')
  , browserify = require('browserify')
  , transform = require('vinyl-transform')
  , rename = require('gulp-rename')
  , sass = require('gulp-ruby-sass')
  , notify = require('gulp-notify');

// Note that absolute paths are REQUIRED while we use the cwd parameter with nodemon. I don't know why this is the case,
// but setting the cwd in nodemon changes the cwd for ALL later tasks. This breaks them if they are relative.
var configs = {
  jshint: __dirname + '/.jshintrc',
  karma: __dirname + '/karma.conf.js',
  protractor: __dirname + '/protractor.conf.js'
};
var client = {
  allSrc: __dirname + '/client/**/*.js',
  moduleSrc: __dirname + '/client/app/**/*.js',
  commonSrc: __dirname + '/client/common/**/*.js',
  entrySrc: __dirname + '/client/app/_application/app.js',
  aatSrc: __dirname + '/client/app/**/aat/*aat.js',
  bowerDir: __dirname + '/client/bower_components',
  sassDir: __dirname + '/client/resources/sass'
};
var server = {
  parentDir: __dirname + '/server',
  cssDir: __dirname + '/server/public/css',
  bundleDir: __dirname + '/server/public/js',
  fontsDir: __dirname + '/server/public/fonts',
  scriptName: 'index.js',
  bundleName: 'bundle.js'
};

// The gulp-browserify plugin has been blacklisted and is no longer maintained, so do it vanilla.
gulp.task('browserify', function() {
  var browserified = transform(function(filename) {
    var b = browserify(filename);
    return b.bundle();
  });

  return gulp.src([client.entrySrc])
    .pipe(browserified)
    .pipe(rename(server.bundleName))
    .pipe(gulp.dest(server.bundleDir));
});

gulp.task('hint', function () {
  gulp.src([client.moduleSrc, client.commonSrc])
    .pipe(jshint(configs.jshint))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('css', function() {
  return gulp.src(client.sassDir + '/test.scss')
    .pipe(sass({
        style: 'compressed',
        loadPath: [
          client.sassDir,
          client.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
          client.bowerDir + '/fontawesome/scss'
        ]
      })
      .on('error', notify.onError(function(error) {
        return 'Error in css task: ' + error.message;
      }))
    )
    .pipe(gulp.dest(server.cssDir));
});

gulp.task('icons', function() {
  return gulp.src(client.bowerDir + '/fontawesome/fonts/**.*')
    .pipe(gulp.dest(server.fontsDir));
});

// Watches all javascript files under /client and calls the browserify task if any change
gulp.task('client-watch', function() {
  // gulp-watch is nicer than gulps built-in watch function because it can look for new files
  watch(client.allSrc, function() {
    gulp.start('browserify');
    gulp.start('hint');
  });
});

gulp.task('build', ['browserify', 'hint', 'css', 'icons', 'client-watch']);

// build changes bundle.js multiple times, so server should wait until it's done to avoid multiple server restarts
gulp.task('server', ['build'], function () {
  // Nodemon will restart Node when files change. So that it doesn't watch the entire directory, we use cwd to start it
  // in the server folder where it has to watch little. I ran into many problems until I came across this solution.
  nodemon({ script: server.scriptName, ext: 'js', cwd: server.parentDir, verbose: true })
    .on('restart', function () {
      console.log('Node.js server restarted due to file change!')
    });
});

gulp.task('tdd', ['build'], function(done) {
  karmaServer.start({ configFile: configs.karma }, done);
});

gulp.task('default', ['build', 'server', 'tdd']);

// Protractor not yet tied into build/development process
gulp.task('webdriver_standalone', webdriver_standalone);
gulp.task('webdriver_update', webdriver_update);

gulp.task('aat', ['webdriver_update'], function(cb) {
  gulp.src([client.aatSrc]).pipe(protractor({
    configFile: configs.protractor
  })).on('error', notify.onError(function(error) {
    return 'Error in aat task: ' + error.message;
  })).on('end', cb);
});
