"use strict";

var gulp = require('gulp');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browserify = require('browserify');

function writeBundle(bundler, paths) {
  return bundler(paths.client.entrySrc)
    .pipe(source(paths.server.bundleName))
    .pipe(gulp.dest(paths.server.bundleDir));
}
function watchifyBundle(filename) {
  var bundler = watchify(browserify(filename, watchify.args));
  bundler.on('update', function() { return writeBundle(watchifyBundle) });
  return bundler.bundle();
}
function browserifyBundle(filename) {
  var bundler = browserify(filename);
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
