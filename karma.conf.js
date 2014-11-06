module.exports = function (config) {
  'use strict';
  config.set({
    basePath: '',
     
    frameworks: ['mocha', 'chai'],
     
    files: [
      'bower_components/angular/*.js',
      'public/js/app.js',
      'test/*.spec.js',
      'public/js/test.*.js'
    ],
                                             
    reporters: ['progress'],
                                                     
    port: 9876,
    colors: true,
    autoWatch: true,
    singleRun: false,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    browsers: ['PhantomJS'] 
  });
};
