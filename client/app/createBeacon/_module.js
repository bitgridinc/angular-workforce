"use strict";

angular
  .module('modules.createBeacon', [])
  .config(
    [         '$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('dashboard.mycompany.create', {
            name: 'dashboard.mycompany.create',
            parent: 'dashboard.mycompany',
            url: '/create',
            views: {
              'left': {
                templateUrl: 'templates/createBeacon/view.tpl.html',
                controller: 'CreateBeaconController'
              }
            }
          });
      }
    ]
  )
  .controller('CreateBeaconController',
    [         '$scope', '$state', 'RestService',
      function($scope,   $state,   RestService) {
        // For debugging purposes
        $scope.name = 'CreateBeaconController';

        angular.extend($scope, {
          title: 'My Project',
          description: 'My Description',
          latitude: 38.914268,
          longitude: -77.021098,
          completeNewBeacon: function(commit) {
            if (commit) {
              RestService.createBeacon({
                title: $scope.title,
                description: $scope.description,
                lat: $scope.latitude,
                lng: $scope.longitude
              });
            }
            $state.go('^.list');
          }
        });

        // When the map is clicked, update the latitude and longitude fields in the form
        $scope.$on("leafletDirectiveMap.click", function(clickEvent, clickArgs) {
          console.log('leafletDirectiveMap.click');
          $scope.latitude = clickArgs.leafletEvent.latlng.lat;
          $scope.longitude = clickArgs.leafletEvent.latlng.lng;
        });
      }
    ]
  );
