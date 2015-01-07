"use strict";

describe('the controller for the root module', function() {
  var socketMock,
      $rootScope,
      service,
      initCallback,
      messageCallback;

  beforeEach(module('app'));
  /*beforeEach(function() {
    socketMock = {
      on: jasmine.createSpy()
    };

    module(function($provide) {
      $provide.value('socket', socketMock);
    });
  });*/
  beforeEach(inject(function(_$rootScope_, _SocketHandlerService_, _$controller_) {
    $rootScope = _$rootScope_;
    service = _SocketHandlerService_;
    socketMock = {
      on: jasmine.createSpy()
    };

    _$controller_('AppController', {
      $rootScope: $rootScope,
      socket: socketMock,
      SocketHandlerService: service
    });
  }));
  beforeEach(function() {
    initCallback = socketMock.on.calls.argsFor(0)[1];
    messageCallback = socketMock.on.calls.argsFor(1)[1];
  });

  // TODO: This is a unit test while the below are integration tests
  it('should have initialized $rootScope with an object to store state from the socket', function() {
    expect($rootScope.socketState.allEntities).toBeDefined();
    expect($rootScope.socketState.currentEntity).toBeDefined();
    expect($rootScope.socketState.beacons).toBeDefined();
  });

  describe('after init has been received', function() {
    var currentEntity;
    beforeEach(function() {
      // Arrange
      currentEntity = {
        name: 'Your Organization',
        id: '55a2726e-43ff-4ea9-8d3e-b7c439ef0e84'
      };
      var allEntities = [
        currentEntity,
        {
          name: 'Determined Douchebags',
          id: '7cf52dba-992e-4f3f-bbb7-36f4b1792e69'
        }
      ];

      // Act
      initCallback({ allEntities: allEntities, currentEntity: currentEntity });
    });

    it('should have copied the init data to $rootScope', function() {
      // Assert
      expect($rootScope.socketState.allEntities.length).toBe(2);
      expect($rootScope.socketState.allEntities[0]).toEqual($rootScope.socketState.currentEntity);
    });

    describe('after message has been received', function() {
      it('should create a new beacon in $rootScope', function() {
        // Arrange
        var request = {
          contents: {
            id: 'e688af0b-63df-48bc-941c-9cc5f750367b'
          },
          senderId: currentEntity.id,
          rootMessageId: 'e688af0b-63df-48bc-941c-9cc5f750367b'
        };

        // Act
        messageCallback(request);

        // Assert
        expect($rootScope.socketState.beacons.length).toBe(1);
      });
    });
  });
});
