"use strict";

angular
  .module('modules.header', [
      'ui.router'
    ]
  )
  .controller('HeaderController',
    [         '$scope', '$rootScope',
      function($scope,   $rootScope) {
        $scope.dataFromServer = $rootScope.dataFromServer;
      }
    ]
  );
