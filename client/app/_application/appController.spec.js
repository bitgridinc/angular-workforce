"use strict";

describe('the controller for the root module', function() {
  var socketFactoryMock
    , $rootScope
    , service
    , initCallback
    , messageCallback;

  beforeEach(module('app'));
  beforeEach(inject(function(_$rootScope_, _SocketHandlerService_, _$controller_) {
    $rootScope = _$rootScope_;
    service = _SocketHandlerService_;
    socketFactoryMock = {
      on: jasmine.createSpy()
    };

    _$controller_('AppController', {
      $rootScope: $rootScope,
      SocketFactory: socketFactoryMock,
      SocketHandlerService: service
    });
  }));
  beforeEach(function() {
    initCallback = socketFactoryMock.on.calls.argsFor(0)[1];
    messageCallback = socketFactoryMock.on.calls.argsFor(1)[1];
  });

  it('should have initialized $rootScope with an object to store state from the socket', function() {
    expect($rootScope.dataFromServer.allOrganizations).toBeDefined();
    expect($rootScope.dataFromServer.currentOrganization).toBeDefined();
    expect($rootScope.dataFromServer.beacons).toBeDefined();
  });

  describe('after init has been received', function() {
    var currentOrganization;
    beforeEach(function() {
      // Arrange
      currentOrganization = {
        name: 'Murfreesboro Electric Department',
        id: '7a95759f-3df8-4f16-bb43-24f4329fe3df'
      };
      var allOrganizations = [
        currentOrganization,
        {
          name: 'Morristown Utility Systems',
          id: '323f8a60-37c6-4d97-a2f8-331c2231e92b'
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
        expect($rootScope.dataFromServer.beacons.length).toBe(2);
      });
    });
  });
});
