"use strict";

// Remember, you can't use require here :C

describe('the service that wraps SocketIO', function() {
  var service;

  beforeEach(module('app'));
  beforeEach(inject(function(_SocketHandlerService_) {
    service = _SocketHandlerService_;
  }));

  describe('after initialize has been called', function() {
    beforeEach(function() {
      service.initialize({
        allEntities: [],
        currentEntity: {},
        beacons: []
      });
    });

    describe('after init message has been received', function() {
      var currentEntity = {
        name: 'Tupper Lake',
        id: '55a2726e-43ff-4ea9-8d3e-b7c439ef0e84'
      };

      beforeEach(function() {
        service.onInit({
          allEntities: [
            currentEntity,
            {
              name: 'Silver Springs',
              id: '7cf52dba-992e-4f3f-bbb7-36f4b1792e69'
            },
            {
              name: 'Bergen',
              id: 'c1d8d77c-b4d7-4007-a5ea-a0564c751f54'
            }
          ],
          currentEntity: currentEntity,
          beacons: [{
            id: 'e688af0b-63df-48bc-941c-9cc5f750367b',
            senderId: currentEntity.id,
            responses: [],
            acceptedAssistance: []
          }]
        });
      });

      /*it ('should error if the incoming message does not specify the id, sender id, or is completely empty', function () {
        // Arrange
        var invalidMessages = [
          {
            contents: {},
            senderId: currentEntity.id,
            rootMessageId: 'e688af0b-63df-48bc-941c-9cc5f750367b'
          },
          {
            contents: { id: 'e688af0b-63df-48bc-941c-9cc5f750367b' },
            senderId: undefined,
            rootMessageId: 'e688af0b-63df-48bc-941c-9cc5f750367b'
          },
          {
            contents: { id: 'e688af0b-63df-48bc-941c-9cc5f750367b' },
            senderId: currentEntity.id,
            rootMessageId: undefined
          },
          null,
          undefined
        ];
        var invocation = function() {
          service.onMessage(message);
        };

        for (var message in invalidMessages) {
          // Act/Assert
          expect(invocation).toThrow();
        }
      });*/

      it ('should store beacons sent in the init message', function() {
        expect(service.dataFromServer.beacons.length).toBe(1);
        expect(service.dataFromServer.beacons[0].senderId).toEqual(currentEntity.id);
      });
      it ('should store new messages in the list of beacons', function () {
        // Act
        var id = '97b12600-51de-472a-8cff-08b67a4f0340';
        service.onNewBeacon({
          id: id,
          senderId: currentEntity.id,
          acceptedAssistance: []
        });

        // Assert
        expect(service.dataFromServer.beacons.length).toBe(2);
        expect(service.dataFromServer.beacons[1].id).toEqual(id);
      });
      it ('should not add incoming message to the list of beacons if the beacon is already present', function () {
        // Act
        service.onNewBeacon({
          id: 'e688af0b-63df-48bc-941c-9cc5f750367b',
          senderId: currentEntity.id,
          acceptedAssistance: []
        });

        // Assert
        expect(service.dataFromServer.beacons.length).toBe(1);
      });
      it ('should not throw an error if an assistance response is received for a beacon that is not present', function () {
        // Act
        service.onAssistanceResponse({
          id: '5eb19570-5567-44f0-ab55-95189383fab0',
          senderId: currentEntity.id,
          beaconId: 'NOPE9999-63df-48bc-941c-9cc5f750367b'
        });

        // Assert
        expect(service.dataFromServer.beacons[0].responses.length).toBe(0);
      });

      describe('after a response message has been received', function() {
        var responseMessage = {
          id: '5eb19570-5567-44f0-ab55-95189383fab0',
          senderId: currentEntity.id,
          beaconId: 'e688af0b-63df-48bc-941c-9cc5f750367b'
        };

        beforeEach(function() {
          service.onAssistanceResponse(responseMessage);
        });

        it ('should add incoming messages to the responses array of its beacon if the message is not the root', function () {
          expect(service.dataFromServer.beacons.length).toBe(1);
          expect(service.dataFromServer.beacons[0].responses.length).toBe(1);
          expect(service.dataFromServer.beacons[0].responses[0]).toBe(responseMessage);
        });
        it ('should not add duplicate incoming response messages', function () {
          // Act
          service.onAssistanceResponse(responseMessage);

          // Assert
          expect(service.dataFromServer.beacons[0].responses.length).toBe(1);
          expect(service.dataFromServer.beacons[0].responses[0]).toBe(responseMessage);
        });
        it ('should allow for accepting the response by moving the response to the acceptedAssistance array of the beacon', function() {
          // {
          //   beaconId: beacon.id,
          //   responseId: acceptedResponse.id
          // }
          service.onAcceptedAssistance({
            beaconId: 'e688af0b-63df-48bc-941c-9cc5f750367b',
            responseId: '5eb19570-5567-44f0-ab55-95189383fab0'
          });

          expect(service.dataFromServer.beacons[0].responses.length).toBe(0);
          expect(service.dataFromServer.beacons[0].acceptedAssistance.length).toBe(1);
        });
      });
    });
  });
});
