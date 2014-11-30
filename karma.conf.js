module.exports = function (config) {
  'use strict';
  config.set({
    basePath: '',
     
    frameworks: ['jasmine'],
     
    files: [
      'server/public/js/bundle.js',
      'node_modules/angular-mocks/*.js',
      'test/integration/**/*.spec.js',
      'test/unit/**/*.spec.js'
    ],
                                             
    reporters: ['story'],
                                                     
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
