"use strict";

require('./_module')
  .controller('AssignedUsersController',
    [         '$scope', 'RestService',
      function($scope,   RestService) {
        // For debugging purposes
        $scope.name = 'AssignedUsersController';

        RestService.getAllUsers().then(function(users) {
          $scope.users = users.data.users;
        });
      }
    ]
  );
