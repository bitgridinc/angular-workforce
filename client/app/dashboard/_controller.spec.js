"use strict";

describe('the controller for the dashboard module', function() {
  var socketFactoryMock
    , $rootScope
    , service
    , initCallback
    , messageCallback;

  beforeEach(module('app'));
  beforeEach(module('modules.dashboard'));
  beforeEach(inject(function(_$rootScope_, _SocketHandlerService_, _$controller_) {
    $rootScope = _$rootScope_;
    service = _SocketHandlerService_;
    socketFactoryMock = {
      on: jasmine.createSpy()
    };

    // This initializes $rootScope with the dataFromServer structure
    // TODO: Ask Sahil about this. It ceases to be a unit test, but it seems smart.
    _$controller_('AppController', {
      $rootScope: $rootScope
    });
    _$controller_('DashboardController', {
      $rootScope: $rootScope,
      SocketFactory: socketFactoryMock,
      SocketHandlerService: service
    });
  }));
  beforeEach(function() {
    initCallback = socketFactoryMock.on.calls.argsFor(0)[1];
    messageCallback = socketFactoryMock.on.calls.argsFor(1)[1];
  });

  describe('after init has been received', function() {
    var currentOrganization;
    beforeEach(function() {
      // Arrange
      currentOrganization = {
        name: 'Murfreesboro Electric Department',
        id: 'yk7EooUDkOKQA9zj'
      };
      var allOrganizations = [
        currentOrganization,
        {
          name: 'Morristown Utility Systems',
          id: 'a9ZaRCDMCo0WWZO7'
        }
      ];

      // Act
      initCallback({ allOrganizations: allOrganizations, currentOrganization: currentOrganization, beacons: [] });
    });

    it('should have copied the init data to $rootScope', function() {
      // Assert
      expect($rootScope.dataFromServer.allOrganizations.length).toBe(2);
      expect($rootScope.dataFromServer.allOrganizations[0]).toEqual($rootScope.dataFromServer.currentOrganization);
    });

    describe('after message has been received', function() {
      it('should create a new beacon in $rootScope', function() {
        // Arrange
        var request = {
          contents: {
            id: 'e688af0b-63df-48bc-941c-9cc5f750367b'
          },
          senderId: currentOrganization.id,
          rootMessageId: 'e688af0b-63df-48bc-941c-9cc5f750367b'
        };

        // Act
        messageCallback(request);

        // Assert
        expect($rootScope.dataFromServer.beacons.length).toBe(1);
      });
    });
  });
});
