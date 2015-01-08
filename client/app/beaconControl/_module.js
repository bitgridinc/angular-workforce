"use strict";

require('../beaconDetails/_module.js');
require('../createBeacon/_module.js');
require('../listBeacons/_module.js');
require('../offerAssistance/_module.js');
require('../reviewAssistance/_module.js');

angular
  .module('modules.beaconControl', [
      'modules.beaconDetails',
      'modules.createBeacon',
      'modules.listBeacons',
      'modules.offerAssistance',
      'modules.reviewAssistance'
    ]
  )
  .config(
    [         '$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('dashboard.beacons', {
            abstract: true,
            name: 'dashboard.beacons',
            parent: 'dashboard',
            url: '/beacons',
            templateUrl: 'templates/beaconControl/view2.tpl.html',
            onEnter: function($rootScope) {
              $rootScope.isMyCompanyButtonToggled = true;
            },
            onExit: function($rootScope) {
              $rootScope.isMyCompanyButtonToggled = false;
            }
          });
      }
    ]
  )
  .controller('BeaconControlController',
    [         '$scope', '$rootScope', '$state',
      function($scope,   $rootScope,   $state) {
        $scope.toggleMyBeaconsButton = function() {
          if (angular.isDefined($rootScope.isMyCompanyButtonToggled) && $rootScope.isMyCompanyButtonToggled) {
            $state.go('dashboard');
          } else {
            $state.go('dashboard.beacons.list');
          }
        };
      }
    ]
  );
