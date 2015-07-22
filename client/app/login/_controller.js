"use strict";

var LoginController = function($rootScope, $location, RestService, mode) {
  var _this = this;
  _this.credentials = {};

  _this.onSubmit = function() {
    console.log('Credentials: ', _this.credentials);
    RestService.login(_this.credentials).then(function(result) {
      console.log('Result of login: ', result);
      if (result.data.error) {
        _this.error = result.data.error;
      } else {
        $rootScope.token = result.data.token;
        $location.url($rootScope.$stateParams.to); // Navigate to the intended url now that we're logged in
      }
    });
  };

  if (mode === 'test') {
    _this.credentials.username = 'testuser';
    _this.credentials.password = 'testpass';
    _this.onSubmit();
  }
};

LoginController.$inject = ['$rootScope', '$location', 'RestService', 'mode'];

require('./_module').controller('LoginController', LoginController);
