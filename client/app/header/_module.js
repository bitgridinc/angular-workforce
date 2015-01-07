"use strict";

angular
  .module('modules.beaconDetails', [
      'ui.router'
    ]
  )
  .controller('HeaderController',
    [         '$scope', '$state',
      function($scope,   $state) {
        $scope.goToProfilePage = function() { $state.go('profile'); };
      }
    ]
  );
