"use strict";

describe('the assignedUsersController', function() {
  var $scope
    , $controller
    , restService
    , sut;

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
    sut = $controller('AssignedUsersController', {
      RestService: restService
    });

    // Assert
    expect(sut.users).toBe(users);
  });
  it('should update numResponders when users are selected', function() {
    // Arrange
    var assistanceOffer = {};
    sut = $controller('AssignedUsersController', {
      RestService: restService
    });
    sut.users = [{
      // This one I'm leaving empty because this happens
    }, {
      include: false
    }, {
      include: true
    }, {
      include: true
    }];

    // Act
    sut.onUserSelected(assistanceOffer);

    // Assert
    expect(assistanceOffer.numResponders).toBe(2);
  });
});
