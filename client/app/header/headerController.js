"use strict";

require('./_module')
  .controller('HeaderController',
    [         '$scope', '$rootScope',
      function($scope,   $rootScope) {
        $scope.dataFromServer = $rootScope.dataFromServer;
      }
    ]
  );
