"use strict";

require('./_module')
  .controller('HeaderController',
    [         '$scope', '$rootScope', 'jwtHelper',
      function($scope,   $rootScope,   jwtHelper) {
        $scope.decodedToken = $rootScope.token && jwtHelper.decodeToken($rootScope.token);
        $scope.dataFromServer = $rootScope.dataFromServer;

        $scope.logout = function() {
          $rootScope.token = undefined;
          $rootScope.navigationService.navigateTo('login', { to: '/dashboard' });
        }
      }
    ]
  );
