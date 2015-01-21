"use strict";

angular
  .module('modules.header', [
      'ui.router'
    ]
  )
  .controller('HeaderController',
    [         '$scope', '$rootScope', '$state',
      function($scope,   $rootScope,   $state) {
        $scope.socketState = $rootScope.socketState;
      }
    ]
  );
