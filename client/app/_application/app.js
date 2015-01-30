"use strict";

require('../../bower_components/angular/angular.js');
require('../../bower_components/angular-bootstrap/ui-bootstrap-tpls.js');
require('../../bower_components/angular-ui-router/release/angular-ui-router.js');
var _ = require('../../bower_components/lodash/dist/lodash.js');

require('../../common/directives/_module_init.js');
require('../../common/providers/_module_init.js');

require('../dashboard/_module.js');
require('../profile/_module.js');

angular
  .module('app', [
      'ui.bootstrap',
      'ui.router',
      'modules.directives',
      'modules.providers',
      'modules.dashboard',
      'modules.profile'
    ]
  )
  .run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {

        // It's very handy to add references to $state and $stateParams to the $rootScope
        // so that you can access them from any scope within your applications.For example,
        // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
        // to active whenever 'contacts.list' or one of its descendants is active.
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
      }
    ]
  )
  .config(
    [         '$urlRouterProvider',
      function($urlRouterProvider) {
        $urlRouterProvider.otherwise('/dashboard');

        // Normally, the '#' is used to implement routing in the url of a single-page application as changes in the
        // comment don't trigger a page load. HTML5 mode allows for this same routing but native in the browser. There are
        // two problems, though. First, browser support for this isn't consistent. Second, we would need to update the
        // server to serve our application on every possible route within the application (because a user pasting in a
        // copied url shouldn't get a 404). The downside is that we have a '#' in our urls. Big whoop.
        //$locationProvider.html5Mode(true);
      }
    ]
  )
  // This controller wires up the $rootScope for consumption by the entire application.
  .controller('AppController',
    [         '$rootScope', 'socket', 'SocketHandlerService',
      function($rootScope,   socket,   SocketHandlerService) {

        $rootScope.socketState = {
          allEntities: [],
          currentEntity: {},
          beacons: []
        };
        $rootScope.findEntityById = function(id) {
          console.log('Finding organization by id: ', id, $rootScope.socketState.allEntities);
          return _.find($rootScope.socketState.allEntities, function(entity) {
            return entity.id === id;
          });
        };

        SocketHandlerService.initialize($rootScope.socketState);
        socket.on('init', _.bind(SocketHandlerService.onInit, SocketHandlerService));
        socket.on('newBeacon', _.bind(SocketHandlerService.onNewBeacon, SocketHandlerService));
        socket.on('assistanceResponse', _.bind(SocketHandlerService.onAssistanceResponse, SocketHandlerService));
        socket.on('acceptedAssistance', _.bind(SocketHandlerService.onAcceptedAssistance, SocketHandlerService));
      }
    ]
  )
  .service('SocketHandlerService',
    [
      function() {
        return {
          socketState: undefined,
          initialize: function(socketState) {
            console.log('Initializing socketState in the socketHandlerService', socketState);
            this.socketState = socketState;
          },
          onInit: function(data) {
            console.log('onInit called with: ', data);
            angular.copy(data, this.socketState);
          },
          onNewBeacon: function(request) {
            console.log('onNewBeacon called with', request, this.socketState);

            var existingBeacon = _.find(this.socketState.beacons, function(beacon) {
              return beacon.id === request.id;
            });
            if (angular.isDefined(existingBeacon)) {
              console.log('Beacon already exists: ', existingBeacon);
              return;
            }

            this.socketState.beacons.push(request);
          },
          onAssistanceResponse: function(request) {
            console.log('onAssistanceResponse called with', request, this.socketState, this);

            /*if (angular.isUndefined(request) ||
              angular.isUndefined(request.senderId) ||
              angular.isUndefined(request.beaconId) ||
              angular.isUndefined(request.id)) {
              console.log('Invalid request in onAssistanceResponse', request);
              throw new Error('Invalid request');
            }*/

            var existingBeacon = _.find(this.socketState.beacons, function(beacon) {
              return beacon.id === request.beaconId;
            });
            var existingResponse = _.find(existingBeacon.responses, function(response) {
              return response.id === request.id;
            });
            if (angular.isDefined(existingResponse)) {
              console.log('Beacon already exists: ', existingBeacon);
              return;
            }

            existingBeacon.responses.push(request);
          },
          onAcceptedAssistance: function(request) {
            console.log('onAcceptedAssistance called with', request);
            // {
            //   beaconId: beacon.id,
            //   responseId: acceptedResponse.id
            // }
            var beacon = _.find(this.socketState.beacons, function(beacon) {
              return beacon.id === request.beaconId;
            });
            var acceptedResponse = _.remove(beacon.responses, function(response) {
              return response.id === request.responseId;
            })[0];
            console.log('Moving response from pending to accepted: ', acceptedResponse);
            beacon.acceptedAssistance.push(acceptedResponse);
          }
        };
      }
    ]
  );