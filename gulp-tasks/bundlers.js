"use strict";

var gulp = require('gulp');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browserify = require('browserify');

function writeBundle(bundler, paths) {
  return bundler(paths)
    .on('error', function(error) {
      console.log('Caught bundler error, jshint will explain...');
      gulp.start('hint'); // This isn't clean to be calling this here, but I don't see how to change it...
      this.emit('end');
    })
    .pipe(source(paths.server.bundleName))
    .pipe(gulp.dest(paths.server.bundleDir));
}
function watchifyBundle(paths) {
  console.time('watchify');

  var bundler = watchify(browserify(paths.client.entrySrc, watchify.args));
  bundler.on('update', function() {
    console.log('Watchify creating bundle');
    return writeBundle(watchifyBundle, paths)
  });
  return bundler.bundle()
    .on('end', function() {
      // Watchify doesn't provide the bundling time. With this, I find it's about 3-4 times faster than Browserify.
      console.timeEnd('watchify');
    });
}
function browserifyBundle(paths) {
  var bundler = browserify(paths.client.entrySrc);
  return bundler.bundle();
}

module.exports = {
  browserify: function(paths) {
    return writeBundle(browserifyBundle, paths);
  },
  watchify: function(paths) {
    return writeBundle(watchifyBundle, paths);
  }
};
