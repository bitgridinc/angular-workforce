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
  commonSrc: __dirname + '/client/common/**/**/*.js',
  entrySrc: __dirname + '/client/app/_application/_module.js',
  aatSrc: [__dirname + '/client/app/**/aat/*aat.js', __dirname + '/client/common/**/aat/*aat.js'],
  bowerDir: __dirname + '/client/bower_components',
  allSassSrc: [__dirname + '/client/resources/sass/*.scss', __dirname + '/client/resources/sass/directives/*.scss']
};
var server = {
  parentDir: __dirname + '/server',
  cssDir: __dirname + '/server/public/css',
  bundleDir: __dirname + '/server/public/js',
  fontsDir: __dirname + '/server/public/fonts',
  scriptName: 'server.js',
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

gulp.task('build', ['browserify', 'css', 'icons']);
gulp.task('build-and-watch', ['watchify', 'hint', 'css', 'icons', 'client-watch']);

function runJasmineServerTests() {
  exec('jasmine', function(error, stdout, stderr) {
    console.log('jasmine output: ', stdout, stderr);
    if (error !== null) {
      console.log('jasmine exec error: ' + error);
    }
  });
}

// browserify changes bundle.js multiple times, so server should wait until it's done to avoid multiple server restarts
gulp.task('server', ['build-and-watch'], function () {
  var nodemonParams = {
    script: server.scriptName,
    ext: 'js',
    cwd: server.parentDir
  };

  // We need to pass the aat env var through if it's set, so that we can mock data for our AATs
  if (process.env.aat) {
    nodemonParams.env = {
      "aat": process.env.aat
    }
  };

  // Nodemon will restart Node when files change. So that it doesn't watch the entire directory, we use cwd to start it
  // in the server folder where it has to watch little. I ran into many problems until I came across this solution.
  // Note: Use ', verbose: true' to debug
  nodemon(nodemonParams)
    .on('start', function() {
      runJasmineServerTests();
    })
    .on('restart', function () {
      runJasmineServerTests();
    });
});

gulp.task('tdd', ['build-and-watch'], function(done) {
  karmaServer.start({ configFile: configs.karma }, done);
});

gulp.task('default', ['server', 'tdd']);

// Protractor not yet tied into build/development process
gulp.task('webdriver_standalone', webdriver_standalone);
gulp.task('webdriver_update', webdriver_update);

gulp.task('aat', ['webdriver_update'], function(cb) {
  gulp.src(client.aatSrc).pipe(protractor({
    configFile: configs.protractor
  })).on('error', function(error) {
    notify("Error in AAT task: " + error);

    // We must fail hard when the AATs fail to avoid deploying broken code to production.
    process.exit(1);
  }).on('end', cb);
});
