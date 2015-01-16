"use strict";

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
        name: 'Your Organization',
        id: '55a2726e-43ff-4ea9-8d3e-b7c439ef0e84'
      };

      beforeEach(function() {
        service.onInit({
          allEntities: [
            currentEntity,
            {
              name: 'Their Organization',
              id: '7cf52dba-992e-4f3f-bbb7-36f4b1792e69'
            },
            {
              name: 'Third Organization',
              id: 'c1d8d77c-b4d7-4007-a5ea-a0564c751f54'
            }
          ],
          currentEntity: currentEntity
        });
      });

      it ('should error if the incoming message does not specify the sender, root message, contents, or is completely empty', function () {
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
      });

      describe('after a beacon message has been received', function() {
        var beaconMessage = {
          contents: {
            id: 'e688af0b-63df-48bc-941c-9cc5f750367b'
          },
          senderId: currentEntity.id,
          rootMessageId: 'e688af0b-63df-48bc-941c-9cc5f750367b'
        };

        beforeEach(function() {
          service.onMessage(beaconMessage);
        });

        it ('should add incoming messages to the list of beacons if the message is the root', function () {
          expect(service.socketState.beacons[0]).toBe(beaconMessage.contents);
          expect(service.socketState.beacons[0].organization).toEqual(currentEntity);
        });
        it ('should not add incoming message to the list of beacons if the beacon is already present', function () {
          // Act
          service.onMessage(beaconMessage);

          // Assert
          expect(service.socketState.beacons.length).toBe(1);
          expect(service.socketState.beacons[0]).toBe(beaconMessage.contents);
          expect(service.socketState.beacons[0].organization).toEqual(currentEntity);
        });

        describe('after a response message has been received', function() {
          var responseMessage = {
            contents: {
              id: '5eb19570-5567-44f0-ab55-95189383fab0'
            },
            senderId: currentEntity.id,
            rootMessageId: 'e688af0b-63df-48bc-941c-9cc5f750367b'
          };

          beforeEach(function() {
            service.onMessage(responseMessage);
          });

          it ('should add incoming messages to the responses array of its beacon if the message is not the root', function () {
            expect(service.socketState.beacons.length).toBe(1);
            expect(service.socketState.beacons[0]).toBe(beaconMessage.contents);
            expect(service.socketState.beacons[0].responses.length).toBe(1);
            expect(service.socketState.beacons[0].responses[0]).toBe(responseMessage.contents);
          });
          it ('should not add duplicate incoming response messages', function () {
            // Act
            service.onMessage(responseMessage);

            // Assert
            expect(service.socketState.beacons[0].responses.length).toBe(1);
            expect(service.socketState.beacons[0].responses[0]).toBe(responseMessage.contents);
          });
        });
      });
    });
  });
});
