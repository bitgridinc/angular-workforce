exports.config = {

  // Uncomment this and run your own Selenium server (command: 'webdriver-manager start')
  // to save 1.5 seconds each time you run the AATs. Remember to comment it again before
  // you check in!
  //seleniumAddress: 'http://localhost:4444/wd/hub',

  framework: 'jasmine',

  specs: [
    './aat/*.spec.js'
  ],
                     
  baseUrl: 'http://localhost:8080',

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    isVerbose: true,
    includeStackTrace: true
  }
};
