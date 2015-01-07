"use strict";

angular
  .module('modules.beaconDetails', [
      'ui.router'
    ]
  )
  .controller('HeaderController',
    [         '$scope', '$rootScope', '$state',
      function($scope,   $rootScope,   $state) {
        $scope.socketState = $rootScope.socketState;
        $scope.goToProfilePage = function() { $state.go('profile'); };
      }
    ]
  );
