"use strict";

describe("the header controller (unit)", function() {
  var $rootScope
    , $scope
    , jwtHelper
    , $controller;

  function initializeController() {
    $controller('HeaderController', {
      '$rootScope': $rootScope,
      '$scope': $scope,
      'jwtHelper': jwtHelper
    });
  }

  beforeEach(module("modules.header"));
  beforeEach(inject(function(_$rootScope_, _$controller_, _jwtHelper_) {
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    jwtHelper = _jwtHelper_;
    $controller = _$controller_;
  }));

  describe('once initialized', function() {
    beforeEach(function() {
      initializeController();

      $rootScope.userNavigationService = {};
    });

    it('should clear the JWT when the user logs out', function() {
      // Arrange
      $rootScope.token = 'token';
      $rootScope.userNavigationService.navigateTo = function() {};

      // Act
      $scope.logout();

      // Assert
      expect($rootScope.token).toBeUndefined();
    });
    it('should navigate to the login page', function() {
      // Arrange
      $rootScope.userNavigationService.navigateTo = jasmine.createSpy();

      // Act
      $scope.logout();

      // Assert
      expect($rootScope.userNavigationService.navigateTo).toHaveBeenCalledWith('login', { to: '/dashboard' });
    });
  });
});
