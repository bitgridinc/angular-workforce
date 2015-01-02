"use strict";

describe('the service that wraps SocketIO', function() {
  var socketMock,
      $rootScope,
      service,
      socket,
      initCallback,
      messageCallback;

  beforeEach(module('app'));
  beforeEach(function() {
    socketMock = {
      on: jasmine.createSpy()
    };

    module(function($provide) {
      $provide.value('socket', socketMock);
    });
  });
  beforeEach(inject(function(_$rootScope_, _$controller_, _RequestService_) {
    $rootScope = _$rootScope_;
    service = _RequestService_;

    _$controller_('AppController', {
      $rootScope: $rootScope,
      RequestService: service
    });
  }));
  beforeEach(function() {
    initCallback = socketMock.on.calls.argsFor(0)[1];
    messageCallback = socketMock.on.calls.argsFor(1)[1];
  });

  describe('after init has been received', function() {
    beforeEach(function() {
      initCallback({
        allEntities: [
          {
            name: 'Macho Diggers',
            id: '55a2726e-43ff-4ea9-8d3e-b7c439ef0e84'
          },
          {
            name: 'Determined Douchebags',
            id: '7cf52dba-992e-4f3f-bbb7-36f4b1792e69'
          },
          {
            name: 'Apostolic Aphids',
            id: 'c1d8d77c-b4d7-4007-a5ea-a0564c751f54'
          }
        ],
        currentEntity: {
          name: 'Macho Diggers',
          id: '55a2726e-43ff-4ea9-8d3e-b7c439ef0e84'
        }
      });
    });

    it('should have copied the init data to $rootScope', function() {
      expect($rootScope.requestService.allEntities.length).toBe(3);
      expect($rootScope.requestService.allEntities[0]).toEqual($rootScope.requestService.currentEntity);
    });
    it ('should add incoming messages to the list of beacons', function () {
      var request = {
        contents: {}
      };
      expect($rootScope.requestService.beacons.length).toBe(0);
      messageCallback(request);
      expect($rootScope.requestService.beacons[0]).toBe(request.contents);
    });
  });
});
