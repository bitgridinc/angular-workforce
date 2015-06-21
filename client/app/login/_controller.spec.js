"use strict";

function createFakePromise(returnValue) {
  return {
    then: function(callback) {
      return callback(returnValue);
    }
  }
}

describe('the login controller', function() {
  var $scope
    , $rootScope
    , $controller
    , $location
    , stubRestService;

  function initializeController(loginResponseData) {
    stubRestService.login.and.returnValue(createFakePromise({
      data: loginResponseData
    }));
    $controller('LoginController', {
      '$scope': $scope,
      '$rootScope': $rootScope,
      '$location': $location,
      'RestService': stubRestService
    });
  }

  beforeEach(module('modules.login'));
  beforeEach(inject(function(_$rootScope_, _$controller_, _$location_) {
    $scope = _$rootScope_.$new();
    $rootScope = _$rootScope_;
    $controller = _$controller_;
    $location = _$location_;

    spyOn($location, 'url');
    stubRestService = jasmine.createSpyObj('RestService', ['login']);
  }));

  it('should pass a username and password to the login function', function() {
    // Arrange
    $rootScope.$stateParams = {}; // The 'to' url doesn't matter for this test
    initializeController({}); // The response doesn't matter for this test
    $scope.credentials.username = 'user';
    $scope.credentials.password = 'pass';

    // Act
    $scope.onSubmit();

    // Assert
    expect(stubRestService.login).toHaveBeenCalledWith($scope.credentials);
  });

  describe('when the user is authorized', function() {
    var loginResponseData;
    beforeEach(function() {
      // Arrange
      loginResponseData = {
        token: 'token123'
      };
      $rootScope.$stateParams = {
        to: '/test/url'
      };
      initializeController(loginResponseData);

      // Act
      $scope.onSubmit();
    });

    it('should store the JWT on $rootScope', function() {
      // Assert
      expect($rootScope.token).toBe(loginResponseData.token);
    });
    it('should navigate to the dashboard', function() {
      // Assert
      expect($location.url).toHaveBeenCalledWith($rootScope.$stateParams.to);
    });
  });

  describe('when the user is not authorized', function() {
    var loginResponseData;
    beforeEach(function() {
      // Arrange
      loginResponseData = {
        error: {
          message: 'Invalid username or password.'
        }
      };
      initializeController(loginResponseData);

      // Act
      $scope.onSubmit();
    });

    it('should store the error on $scope for display in the UI', function() {
      // Assert
      expect($scope.error).toBe(loginResponseData.error);
    });
    it('should navigate to the dashboard', function() {
      // Assert
      expect($location.url).not.toHaveBeenCalled();
    });
  });
});
