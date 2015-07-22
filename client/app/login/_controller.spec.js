"use strict";

function createFakePromise(returnValue) {
  return {
    then: function(callback) {
      return callback(returnValue);
    }
  }
}

describe('the login controller', function() {
  var $rootScope
    , $controller
    , $location
    , stubRestService
    , sut;

  function initializeController(loginResponseData) {
    stubRestService.login.and.returnValue(createFakePromise({
      data: loginResponseData
    }));
    sut = $controller('LoginController', {
      '$rootScope': $rootScope,
      '$location': $location,
      'RestService': stubRestService
    });
  }

  beforeEach(module('modules.login'));
  beforeEach(inject(function(_$rootScope_, _$controller_, _$location_) {
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
    sut.credentials.username = 'user';
    sut.credentials.password = 'pass';

    // Act
    sut.onSubmit();

    // Assert
    expect(stubRestService.login).toHaveBeenCalledWith(sut.credentials);
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
      sut.onSubmit();
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
      sut.onSubmit();
    });

    it('should store the error on this for display in the UI', function() {
      // Assert
      expect(sut.error).toBe(loginResponseData.error);
    });
    it('should navigate to the dashboard', function() {
      // Assert
      expect($location.url).not.toHaveBeenCalled();
    });
  });
});
