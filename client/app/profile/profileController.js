"use strict";

require('./_module')
  .controller('ProfileController',
    [         '$scope', '$rootScope',
      function($scope,   $rootScope) {
        //console.log('ProfileController instantiated:', $scope, $rootScope);
        $scope.organization = $rootScope.dataFromServer.currentEntity;
        $scope.save = function () {
          $rootScope.userNavigationService.go('dashboard');
        };
      }
    ]
  );
