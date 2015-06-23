"use strict";

require('./_module')
  .controller('LoginController',
    [         '$scope',  '$rootScope', '$location', 'RestService', 'testMode',
      function($scope,    $rootScope,   $location,   RestService,   testMode) {
        $scope.credentials = {};

        $scope.onSubmit = function() {
          console.log('Credentials: ', $scope.credentials);
          RestService.login($scope.credentials).then(function(result) {
            console.log('Result of login: ', result);
            if (result.data.error) {
              $scope.error = result.data.error;
            } else {
              $rootScope.token = result.data.token;
              $location.url($rootScope.$stateParams.to); // Navigate to the intended url now that we're logged in
            }
          });
        };

        if (testMode) {
          $scope.credentials.username = 'testuser';
          $scope.credentials.password = 'testpass';
          $scope.onSubmit();
        }
      }
    ]
  );
