"use strict";

require('./_module')
  .controller('PopulateRecipientsController',
    [         '$scope', 'RestService',
      function($scope,   RestService) {
        // For debugging purposes
        $scope.name = 'PopulateRecipientsController';

        RestService.getAllUsers().then(function(users) {
          $scope.users = users.data.users;
        });
      }
    ]
  );
