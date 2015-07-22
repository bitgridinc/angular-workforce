"use strict";

var DashboardController = function($rootScope, SocketFactory, SocketHandlerService,   _) {
  SocketHandlerService.initialize($rootScope.dataFromServer);
  SocketFactory.on('init', _.bind(SocketHandlerService.onInit, SocketHandlerService));
  SocketFactory.on('newBeacon', _.bind(SocketHandlerService.onNewBeacon, SocketHandlerService));
  SocketFactory.on('assistanceResponse', _.bind(SocketHandlerService.onAssistanceResponse, SocketHandlerService));
  SocketFactory.on('acceptedAssistance', _.bind(SocketHandlerService.onAcceptedAssistance, SocketHandlerService));
};

DashboardController.$inject = ['$rootScope', 'SocketFactory', 'SocketHandlerService', '_'];

require('./_module').controller('DashboardController', DashboardController);
