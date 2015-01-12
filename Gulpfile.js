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

var configs = {
  jshint: __dirname + '/.jshintrc',
  karma: __dirname + '/karma.conf.js',
  protractor: __dirname + '/protractor.conf.js'
};

var client = {
  moduleSrc: 'client/app/**/*.js',
  commonSrc: 'client/common/**/*.js',
  entrySrc: 'client/app/_application/app.js',
  aatSrc: 'client/app/**/aat/*aat.js',
  bowerDir: 'client/bower_components',
  sassDir: 'client/resources/sass'
};

var server = {
  parentDir: __dirname + '/server',
  bundleDir: __dirname + '/server/public/js',
  fontsDir: __dirname + '/server/public/fonts',
  scriptName: 'index.js',
  bundleName: 'bundle.js'
};

gulp.task('hint', function () {
  // For some reason, setting the cwd parameter on nodemon forced me to prefix the '.jshintrc' argument with __dirname
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
    .pipe(gulp.dest('./server/public/css'));
});

// The gulp-browserify plugin has been blacklisted and is no longer maintained.
gulp.task('browserify', function() {
  var browserified = transform(function(filename) {
    var b = browserify(filename);
    return b.bundle();
  });

  // Here's another place where I need to set the cwd. It's odd as browserify isn't called from nodemon, the only place
  // I set a non-__dirname cwd. I'm not sure how that setting is getting propagated to the dependent tasks.
  return gulp.src([client.entrySrc], { cwd: __dirname })
             .pipe(browserified)
             .pipe(rename(server.bundleName))
             .pipe(gulp.dest(server.bundleDir));
});

// Watches all javascript files under /client and calls the browserify task if any change
gulp.task('client-watch', function() {
  // gulp-watch is nicer than gulps built-in watch function because it can look for new files
  watch('client/**/*.js', function() {
    gulp.start('browserify');
    gulp.start('hint');
  });
});

// TODO: Move nodemon into a leaf task. That should stop the propagation and avoid the double unit-tests.
gulp.task('develop', ['browserify', 'css', 'client-watch'], function () {
  // Nodemon will restart Node when files change. So that it doesn't watch the entire directory, we use cwd to start it
  // in the server folder where it has to watch little. I ran into many problems until I came across this solution.
  nodemon({ script: server.scriptName, ext: 'js', cwd: server.parentDir, verbose: true })
    .on('restart', function () {
      console.log('Node.js server restarted due to file change!')
    });
});

// Strangely, these tests run twice only the first time, then karma is fine.
// It doesn't matter where I depend on this task.
gulp.task('tdd', function(done) {
  karmaServer.start({ configFile: configs.karma }, done);
});

gulp.task('icons', function() {
  return gulp.src(client.bowerDir + '/fontawesome/fonts/**.*')
    .pipe(gulp.dest(server.fontsDir));
});

gulp.task('default', ['develop', 'tdd', 'icons']);

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
