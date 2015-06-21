"use strict";

require('./_module')
  .controller('DashboardController',
    [         '$rootScope', 'SocketFactory', 'SocketHandlerService', '_',
      function($rootScope,   SocketFactory,   SocketHandlerService,   _) {
        SocketHandlerService.initialize($rootScope.dataFromServer);
        SocketFactory.on('init', _.bind(SocketHandlerService.onInit, SocketHandlerService));
        SocketFactory.on('newBeacon', _.bind(SocketHandlerService.onNewBeacon, SocketHandlerService));
        SocketFactory.on('assistanceResponse', _.bind(SocketHandlerService.onAssistanceResponse, SocketHandlerService));
        SocketFactory.on('acceptedAssistance', _.bind(SocketHandlerService.onAcceptedAssistance, SocketHandlerService));
      }
    ]
  );
