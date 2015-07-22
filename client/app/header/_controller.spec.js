"use strict";

describe("the header controller (unit)", function() {
  var $rootScope
    , jwtHelper
    , $controller
    , controller;

  function initializeController() {
    controller = $controller('HeaderController', {
      '$rootScope': $rootScope,
      'jwtHelper': jwtHelper
    });
  }

  beforeEach(module("modules.header"));
  beforeEach(inject(function(_$rootScope_, _$controller_, _jwtHelper_) {
    $rootScope = _$rootScope_;
    jwtHelper = _jwtHelper_;
    $controller = _$controller_;
  }));

  describe('once initialized', function() {
    beforeEach(function() {
      initializeController();

      $rootScope.navigationService = {};
    });

    it('should clear the JWT when the user logs out', function() {
      // Arrange
      $rootScope.token = 'token';
      $rootScope.navigationService.navigateTo = function() {};

      // Act
      controller.logout();

      // Assert
      expect($rootScope.token).toBeUndefined();
    });
    it('should navigate to the login page', function() {
      // Arrange
      $rootScope.navigationService.navigateTo = jasmine.createSpy();

      // Act
      controller.logout();

      // Assert
      expect($rootScope.navigationService.navigateTo).toHaveBeenCalledWith('login', { to: '/dashboard' });
    });
  });
});
