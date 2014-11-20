exports.config = {

  framework: 'jasmine',

  specs: [
    './e2e/*.spec.js'
  ],
                     
  baseUrl: 'http://localhost:8080',

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    isVerbose: true,
    includeStackTrace: true
  }
};
