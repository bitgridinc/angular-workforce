"use strict";

angular
  .module('modules.profile', [])
  .config(
    [         '$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('profile', {
            name: 'profile',
            url: '/profile',
            templateUrl: 'templates/profile/view.tpl.html',
            controller: 'ProfileController'
          });
      }
    ]
  )
  .controller('ProfileController',
    [         '$scope', '$rootScope', '$state',
      function($scope,   $rootScope,   $state) {
        //console.log('ProfileController instantiated:', $scope, $rootScope, $state);
        $scope.organization = $rootScope.socketState.currentEntity;
        $scope.save = function () {
          $state.go('dashboard');
        };
      }
    ]
  );
