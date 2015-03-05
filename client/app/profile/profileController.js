"use strict";

require('./_module')
  .controller('ProfileController',
    [         '$scope', '$rootScope', '$state',
      function($scope,   $rootScope,   $state) {
        //console.log('ProfileController instantiated:', $scope, $rootScope, $state);
        $scope.organization = $rootScope.dataFromServer.currentEntity;
        $scope.save = function () {
          $state.go('dashboard');
        };
      }
    ]
  );
