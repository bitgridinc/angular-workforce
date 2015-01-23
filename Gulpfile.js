"use strict";

var gulp = require('gulp')
  , nodemon = require('gulp-nodemon')
  , jshint = require('gulp-jshint')
  , karmaServer = require('karma').server
  , webdriver_standalone = require('gulp-protractor').webdriver_standalone
  , webdriver_update = require('gulp-protractor').webdriver_update
  , protractor = require('gulp-protractor').protractor
  , watch = require('gulp-watch')
  , browserify = require('browserify')
  , watchify = require('watchify')
  , transform = require('vinyl-transform')
  , rename = require('gulp-rename')
  , sass = require('gulp-ruby-sass')
  , notify = require('gulp-notify')
  , jasmineNode = require('jasmine-node')
  , exec = require('child_process').exec;

// Note that absolute paths are REQUIRED while we use the cwd parameter with nodemon. I don't know why this is the case,
// but setting the cwd in nodemon changes the cwd for ALL later tasks. This breaks them if they are relative.
var configs = {
  jshint: __dirname + '/.jshintrc',
  karma: __dirname + '/karma.conf.js',
  protractor: __dirname + '/protractor.conf.js'
};
var client = {
  allJsSrc: __dirname + '/client/**/*.js',
  moduleSrc: __dirname + '/client/app/**/*.js',
  commonSrc: __dirname + '/client/common/**/*.js',
  entrySrc: __dirname + '/client/app/_application/app.js',
  aatSrc: [__dirname + '/client/app/**/aat/*aat.js', __dirname + '/client/common/**/aat/*aat.js'],
  bowerDir: __dirname + '/client/bower_components',
  allSassSrc: __dirname + '/client/resources/sass/*.scss'
};
var server = {
  parentDir: __dirname + '/server',
  cssDir: __dirname + '/server/public/css',
  bundleDir: __dirname + '/server/public/js',
  fontsDir: __dirname + '/server/public/fonts',
  specSrc: __dirname + '/server/commented/controllers/*',
  specDirs: [__dirname + '/server/commented/controllers'],
  scriptName: 'index.js',
  bundleName: 'bundle.js'
};

function bundle(bundler) {
  var browserified = transform(bundler);
  return gulp.src(client.entrySrc)
    .pipe(browserified)
    .pipe(rename(server.bundleName))
    .pipe(gulp.dest(server.bundleDir));
}

function runWatchify(filename) {
  var bundler = watchify(browserify(filename, watchify.args));
  bundler.on('update', function() { return bundle(runWatchify) });
  return bundler.bundle();
}

function runBrowserify(filename) {
  var b = browserify(filename);
  return b.bundle();
}

gulp.task('watchify', function() { return bundle(runWatchify); });
gulp.task('browserify', function() { return bundle(runBrowserify); });

gulp.task('hint', function () {
  gulp.src([client.moduleSrc, client.commonSrc])
    .pipe(jshint(configs.jshint))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('css', function() {
  return gulp.src(client.allSassSrc)
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
  return gulp.src([client.bowerDir + '/fontawesome/fonts/**.*', client.bowerDir + '/bootstrap-sass-official/assets/fonts/bootstrap/**.*'])
             .pipe(gulp.dest(server.fontsDir));
});

gulp.task('client-watch', function() {
  // gulp-watch is nicer than gulps built-in watch function because it can look for new files
  watch(client.allJsSrc, function() {
    gulp.start('hint');
  });
  watch(client.allSassSrc, function() {
    gulp.start('css');
  });
});

gulp.task('jasmine-node', function() {
  // This sure isn't pretty, but there's no gulp plugin for jasmine-node. And I want jasmine-node to TDD my server.
  watch(server.specSrc, function() {
    exec('jasmine-node ' + server.specDirs, function(error, stdout, stderr) {
      console.log(stdout, stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
  });
});

gulp.task('build', ['browserify', 'css', 'icons']);
gulp.task('build-and-watch', ['watchify', 'hint', 'css', 'icons', 'client-watch']);

// browserify changes bundle.js multiple times, so server should wait until it's done to avoid multiple server restarts
gulp.task('server', ['build-and-watch'], function () {
  // Nodemon will restart Node when files change. So that it doesn't watch the entire directory, we use cwd to start it
  // in the server folder where it has to watch little. I ran into many problems until I came across this solution.
  // Note: Use ', verbose: true' to debug
  nodemon({ script: server.scriptName, ext: 'js', cwd: server.parentDir })
    .on('restart', function () {
      console.log('Node.js server restarted due to file change!')
    });
});

gulp.task('tdd', ['build-and-watch', 'jasmine-node'], function(done) {
  karmaServer.start({ configFile: configs.karma }, done);
});

gulp.task('default', ['server', 'tdd']);

// Protractor not yet tied into build/development process
gulp.task('webdriver_standalone', webdriver_standalone);
gulp.task('webdriver_update', webdriver_update);

gulp.task('aat', ['webdriver_update'], function(cb) {
  gulp.src(client.aatSrc).pipe(protractor({
    configFile: configs.protractor
  })).on('error', notify.onError(function(error) {
    return 'Error in aat task: ' + error.message;
  })).on('end', cb);
});
