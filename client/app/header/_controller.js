"use strict";

require('./_module')
  .controller('HeaderController',
    [         '$scope', '$rootScope', 'jwtHelper',
      function($scope,   $rootScope,   jwtHelper) {
        console.log('WHOA1: ', $rootScope.token, jwtHelper.decodeToken);
        $scope.decodedToken = $rootScope.token && jwtHelper.decodeToken($rootScope.token);
        console.log('WHOA2: ', $scope.decodedToken);
        $scope.dataFromServer = $rootScope.dataFromServer;
      }
    ]
  );
