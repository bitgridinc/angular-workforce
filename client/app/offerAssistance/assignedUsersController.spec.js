"use strict";

describe('the assignedUsersController', function() {
  var $scope
    , $controller
    , restService;

  beforeEach(module('modules.offerAssistance'));
  beforeEach(inject(function (_$rootScope_, _$controller_, RestService) {
    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    restService = RestService;
  }));

  it('should set $scope.users with those returned by getAllUsers', function() {
    // Arrange
    var users = [{}, {}];
    spyOn(restService, 'getAllUsers').and.returnValue({
      then: function(callback) {
        callback({
          data: {
            users: users
          }
        });
      }
    });

    // Act
    $controller('AssignedUsersController', {
      $scope: $scope,
      RestService: restService
    });

    // Assert
    expect($scope.users).toBe(users);
  });
  it('should update numResponders when users are selected', function() {
    // Arrange
    $scope.assistanceOffer = {};
    $scope.users = [{
      // This one I'm leaving empty because this happens
    }, {
      include: false
    }, {
      include: true
    }, {
      include: true
    }];
    $controller('AssignedUsersController', {
      $scope: $scope,
      RestService: restService
    });

    // Act
    $scope.onUserSelected();

    // Assert
    expect($scope.assistanceOffer.numResponders).toBe(2);
  });
});
