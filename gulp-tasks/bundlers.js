"use strict";

var gulp = require('gulp');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browserify = require('browserify');

function writeBundle(bundler, paths) {
  return bundler(paths)
    .pipe(source(paths.server.bundleName))
    .pipe(gulp.dest(paths.server.bundleDir));
}
function watchifyBundle(paths) {
  var bundler = watchify(browserify(paths.client.entrySrc, watchify.args));
  bundler.on('update', function() { return writeBundle(watchifyBundle, paths) });
  return bundler.bundle();
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
