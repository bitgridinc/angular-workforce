"use strict";

var AssignedUsersController = function(RestService, _) {
  var _this = this;

  RestService.getAllUsers().then(function(users) {
    _this.users = users.data.users;
  });

  _this.onUserSelected = function(assistanceOffer) {
    assistanceOffer.numResponders = _.sum(_this.users, function(user) {
      return user.include ? 1 : 0;
    });
  };
};

AssignedUsersController.$inject = ['RestService', '_'];

require('./_module').controller('AssignedUsersController', AssignedUsersController);
