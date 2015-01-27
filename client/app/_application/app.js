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

        SocketHandlerService.initialize($rootScope.socketState);
        socket.on('init', _.bind(SocketHandlerService.onInit, SocketHandlerService));
        socket.on('message', _.bind(SocketHandlerService.onMessage, SocketHandlerService));
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
            console.log('onInit called with', data, this.socketState);
            var socketState = {
              allEntities: data.allEntities,
              currentEntity: data.currentEntity,
              beacons: []
            };

            // TODO: Test this or...
            // TODO: Change so that the Organization is retrieved on-demand or...
            // TODO: Store beacons in a beacons array on the sending Organization
            // Populate Organization on every beacon
            _.forEach(data.beacons, function(beacon) {
              beacon.organization = _.find(socketState.allEntities, function(entity) {
                return entity.id === beacon.senderId;
              });

              // And populate Organization on all their responses
              _.forEach(beacon.responses, function(response) {
                response.organization = _.find(socketState.allEntities, function(entity) {
                  return entity.id === response.senderId;
                });
              });

              socketState.beacons.push(beacon);
            });

            angular.copy(socketState, this.socketState);
          },
          onMessage: function(request) {
            console.log('onMessage called with', request, this.socketState, this);

            if (angular.isUndefined(request) ||
              angular.isUndefined(request.senderId) ||
              angular.isUndefined(request.rootMessageId) ||
              angular.isUndefined(request.contents) ||
              angular.isUndefined(request.contents.id)) {
              console.log('Invalid request in onMessage', request);
              throw new Error('Invalid request');
            }

            // We don't want to send copies of the same entity with every message it sends. This matches up the entity
            // based on the senderId property.
            request.contents.organization = _.find(this.socketState.allEntities, function(entity) {
              return entity.id === request.senderId;
            });

            var existingBeacon = _.find(this.socketState.beacons, function(beacon) {
              return beacon.id === request.rootMessageId;
            });
            if (angular.equals(request.contents.id, request.rootMessageId)) {
              if (existingBeacon === undefined) {
                request.contents.responses = [];
                this.socketState.beacons.push(request.contents);
              }
            } else {
              var existingResponse = _.find(existingBeacon.responses, function(response) {
                return response.id === request.contents.id;
              });
              if (angular.isUndefined(existingResponse)) {
                existingBeacon.responses.push(request.contents);
              }
            }
          }
        };
      }
    ]
  );