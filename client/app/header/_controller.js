"use strict";

var HeaderController = function($rootScope, jwtHelper) {
  this.decodedToken = $rootScope.token && jwtHelper.decodeToken($rootScope.token);

  this.logout = function() {
    $rootScope.token = undefined;
    $rootScope.navigationService.navigateTo('login', { to: '/dashboard' });
  }
};

HeaderController.$inject = ['$rootScope', 'jwtHelper'];

require('./_module').controller('HeaderController', HeaderController);
