#!/bin/sh
# Generating the 3rd-party dependencies bundle is a manual step. Might be automated in Gulp later.
browserify client/dependencies.js -o server/public/js/dependencies.js
