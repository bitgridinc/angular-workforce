var gulp = require('gulp')
  , nodemon = require('gulp-nodemon')
  , jshint = require('gulp-jshint')
  , karma = require('gulp-karma')
  , webdriver_standalone = require("gulp-protractor").webdriver_standalone
  , webdriver_update = require('gulp-protractor').webdriver_update
  , protractor = require("gulp-protractor").protractor

var testFiles = [
  'test/*.spec.js'
];

gulp.task('lint', function () {
  gulp.src('./**/*.js')
    .pipe(jshint())
})

gulp.task('develop', function () {
  nodemon({ script: 'index.js', ext: 'html js', ignore: ['ignored.js'] })
    .on('change', ['lint'])
    .on('restart', function () {
      console.log('restarted!')
    })
})

// This can be called to run our tests once.
gulp.task('test', function() {
  // Be sure to return the stream
  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});

gulp.task('webdriver_standalone', webdriver_standalone);
gulp.task('webdriver_update', webdriver_update);

gulp.task('protractor', ['webdriver_update'], function(cb) {
  gulp.src(['e2e/*.spec.js']).pipe(protractor({
    configFile: 'protractor.conf.js',
  })).on('error', function(e) {
    console.log(e);
  }).on('end', cb);
});


gulp.task('default', ['protractor', 'develop'], function() {
  // The default task will run karma with the watcher enabled; when any file changes, tests are run.
  gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }));
});
