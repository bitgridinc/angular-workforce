"use strict";

require('../control/_module.js');
require('../header/_module.js');
require('../map/_module.js');

angular
  .module('modules.dashboard', [
      'modules.control',
      'modules.header',
      'modules.map'
    ]
  )
  .config(
    [         '$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('dashboard', {
            name: 'dashboard',
            url: '/dashboard',
            templateUrl: 'templates/dashboard/view.tpl.html',
            controller: 'DashboardController'
          });
      }
    ]
  )
  .controller('DashboardController',
    [         '$scope', '$state',
      function($scope,   $state) {
        var isMyCompanyButtonToggled = false;
        $scope.toggleMyCompanyButton = function () {
          isMyCompanyButtonToggled = !isMyCompanyButtonToggled;
          $state.go(isMyCompanyButtonToggled ? 'dashboard.mycompany.list' : 'dashboard');
        };
      }
    ]
  );
