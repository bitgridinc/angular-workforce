"use strict";

// This controller wires up the $rootScope for consumption by the entire application.
require('./_module')
  .controller('AppController',
    [         '$rootScope', 'socket', 'SocketHandlerService', '_',
      function($rootScope,   socket,   SocketHandlerService,   _) {

        $rootScope.dataFromServer = {
          allEntities: [],
          currentEntity: {},
          beacons: []
        };
        $rootScope.findEntityById = function(id) {
          console.log('Finding organization by id: ', id, $rootScope.dataFromServer.allEntities);
          return _.find($rootScope.dataFromServer.allEntities, function(entity) {
            return entity.id === id;
          });
        };
        $rootScope.findBeaconById = function(id) {
          console.log('Finding beacon by id: ', id, $rootScope.dataFromServer.beacons);
          return _.find($rootScope.dataFromServer.beacons, function(beacon) {
            return beacon.id === id;
          });
        };

        SocketHandlerService.initialize($rootScope.dataFromServer);
        socket.on('init', _.bind(SocketHandlerService.onInit, SocketHandlerService));
        socket.on('newBeacon', _.bind(SocketHandlerService.onNewBeacon, SocketHandlerService));
        socket.on('assistanceResponse', _.bind(SocketHandlerService.onAssistanceResponse, SocketHandlerService));
        socket.on('acceptedAssistance', _.bind(SocketHandlerService.onAcceptedAssistance, SocketHandlerService));
      }
    ]
  );
