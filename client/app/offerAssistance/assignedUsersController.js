"use strict";

require('./_module')
  .controller('AssignedUsersController',
    [         '$scope', 'RestService', '_',
      function($scope,   RestService,   _) {
        // For debugging purposes
        $scope.name = 'AssignedUsersController';

        RestService.getAllUsers().then(function(users) {
          $scope.users = users.data.users;
        });

        $scope.onUserSelected = function() {
          $scope.assistanceOffer.numResponders = _.sum($scope.users, function(user) {
            return user.include ? 1 : 0;
          });
        };
      }
    ]
  );
