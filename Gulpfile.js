"use strict";

var gulp = require('gulp')
  , nodemon = require('gulp-nodemon')
  , karmaServer = require('karma').server
  , webdriver_standalone = require('gulp-protractor').webdriver_standalone
  , webdriver_update = require('gulp-protractor').webdriver_update
  , watch = require('gulp-watch')
  , bundlers = require('./gulp-tasks/bundlers')
  , argv = require('yargs').argv;

// Note that absolute paths are REQUIRED while we use the cwd parameter with nodemon. I don't know why this is the case,
// but setting the cwd in nodemon changes the cwd for ALL later tasks. This breaks them if they are relative.
var paths = {
  configs: {
    jshint: __dirname + '/.jshintrc',
    karma: __dirname + '/karma.conf.js',
    protractor: __dirname + '/protractor.conf.js'
  },
  client: {
    allJsSrc: __dirname + '/client/**/*.js',
    moduleSrc: __dirname + '/client/app/**/*.js',
    commonSrc: __dirname + '/client/common/**/**/*.js',
    entrySrc: __dirname + '/client/app/_application/_module.js',
    aatSrc: [__dirname + '/client/app/beaconControl/aat/*aat.js'],//, __dirname + '/client/common/**/aat/*aat.js'],
    bowerDir: __dirname + '/client/bower_components',
    allSassSrc: [__dirname + '/client/resources/sass/*.scss', __dirname + '/client/resources/sass/directives/*.scss']
  },
  server: {
    parentDir: __dirname + '/server',
    cssDir: __dirname + '/server/public/css',
    bundleDir: __dirname + '/server/public/js',
    fontsDir: __dirname + '/server/public/fonts',
    allSpecSrc: __dirname + '/server/spec/*[sS]pec.js',
    scriptName: 'server.js',
    bundleName: 'bundle.js'
  }
};

function getTask(taskName) {
  return require('./gulp-tasks/' + taskName)(paths);
}

gulp.task('watchify', function() { return bundlers.watchify(paths); });
gulp.task('browserify', function() { return bundlers.browserify(paths); });
gulp.task('hint', getTask('hint'));
gulp.task('css', getTask('css'));
gulp.task('icons', getTask('icons'));

gulp.task('client-watch', function() {
  // gulp-watch is nicer than gulps built-in watch function because it can look for new files, but it can't support the
  // gulp.watch(client.allJsSrc, ['hint']); syntax.
  watch(paths.client.allJsSrc, function() {
    gulp.start('hint');
  });
  watch(paths.client.allSassSrc, function() {
    gulp.start('css');
  });
});

gulp.task('build', ['browserify', 'css', 'icons']);
gulp.task('build-and-watch', ['watchify', 'hint', 'css', 'icons', 'client-watch']);

gulp.task('runJasmineOnce', getTask('runJasmineOnce')); // Codeship Entry Point

// browserify changes bundle.js multiple times, so server should wait until it's done to avoid multiple server restarts
gulp.task('server', ['build-and-watch'], function () {
  var nodemonParams = {
    script: paths.server.scriptName,
    ext: 'js',
    cwd: paths.server.parentDir,
    env: {
      mode: argv.test ? "test" : "prod"
    }
  };

  // Nodemon will restart Node when files change. So that it doesn't watch the entire directory, we use cwd to start it
  // in the server folder where it has to watch little. I ran into many problems until I came across this solution.
  // Note: Use ', verbose: true' to debug
  nodemon(nodemonParams)
    .on('start', function() {
      gulp.start('runJasmineOnce');
    })
    .on('restart', function () {
      gulp.start('runJasmineOnce');
    });
});

///
/// Start Karma
gulp.task('karmaTDD', ['build-and-watch'], function(done) {
  karmaServer.start({ configFile: paths.configs.karma }, done);
});
gulp.task('karmaSingleRun', function(done) {
  karmaServer.start({ configFile: paths.configs.karma, singleRun: true }, done);
}); // Codeship Entry Point
/// End Karma
///

gulp.task('default', ['server', 'karmaTDD']);

///
/// Start Protractor/Webdriver
gulp.task('webdriver_standalone', webdriver_standalone);
gulp.task('webdriver_update', webdriver_update);
gulp.task('aat', ['webdriver_update'], getTask('aat')); // Codeship Entry Point
/// End Protractor/Webdriver
///
