"use strict";

require('../bower_components/angular/angular.js');
require('../bower_components/angular-bootstrap/ui-bootstrap-tpls.js');
require('../bower_components/angular-ui-router/release/angular-ui-router.js');
var _ = require('../bower_components/lodash/dist/lodash.js');

require('../common/directives/_module_init.js');
require('../common/providers/_module_init.js');

require('./dashboard/_module.js');
require('./profile/_module.js');

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
  // TODO: Test this
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
    [         '$rootScope', 'RequestService',
      function($rootScope,   RequestService) {
        console.log('Tying RequestService into rootScope');
        $rootScope.requestService = RequestService;
      }
    ]
  )
  .service('RequestService',
    [         'socket',
      function(socket) {
        var service = {
          allEntities: [],
          currentEntity: {},
          beacons: []
        };

        socket.on('init', function(data) {
          console.log('init called with', data);
          angular.copy(data.allEntities, service.allEntities);
          angular.copy(data.currentEntity, service.currentEntity);
        });

        socket.on('message', function(request) {
          console.log('message received over SocketIO', request);

          if (angular.isUndefined(request) ||
              angular.isUndefined(request.senderId) ||
              angular.isUndefined(request.rootMessageId) ||
              angular.isUndefined(request.contents) ||
              angular.isUndefined(request.contents.id)) {
            throw new Error('Invalid request');
          }

          // We don't want to send copies of the same entity with every message it sends. This matches up the entity
          // based on the senderId property.
          request.contents.organization = _.find(service.allEntities, function(entity) {
            return entity.id === request.senderId;
          });

          if (angular.equals(request.contents.id, request.rootMessageId)) {
            request.contents.responses = [];
            service.beacons.push(request.contents);
          } else {
            _.find(service.beacons, function(beacon) {
              return beacon.id === request.rootMessageId;
            }).responses.push(request.contents);
          }
        });

        return service;
      }
    ]
  );