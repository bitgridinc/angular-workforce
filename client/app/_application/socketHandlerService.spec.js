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
        allOrganizations: [],
        currentOrganization: {},
        beacons: []
      });
    });

    describe('after init message has been received', function() {
      var currentOrganization = {
        name: 'Murfreesboro Electric Department',
        id: '7a95759f-3df8-4f16-bb43-24f4329fe3df'
      };

      beforeEach(function() {
        service.onInit({
          allOrganizations: [
            currentOrganization,
            {
              name: 'Morristown Utility Systems',
              id: '323f8a60-37c6-4d97-a2f8-331c2231e92b'
            },
            {
              name: 'Greeneville Light & Power System',
              id: '83a33674-be04-4c93-81a3-71a9ca0ce339'
            }
          ],
          currentOrganization: currentOrganization,
          beacons: [{
            id: 'e688af0b-63df-48bc-941c-9cc5f750367b',
            senderId: currentOrganization.id,
            responses: [],
            acceptedAssistance: []
          }]
        });
      });

      it ('should store beacons sent in the init message', function() {
        expect(service.dataFromServer.beacons.length).toBe(1);
        expect(service.dataFromServer.beacons[0].senderId).toEqual(currentOrganization.id);
      });
      it ('should store new messages in the list of beacons', function () {
        // Act
        var id = '97b12600-51de-472a-8cff-08b67a4f0340';
        service.onNewBeacon({
          id: id,
          senderId: currentOrganization.id,
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
          senderId: currentOrganization.id,
          acceptedAssistance: []
        });

        // Assert
        expect(service.dataFromServer.beacons.length).toBe(1);
      });
      it ('should not throw an error if an assistance response is received for a beacon that is not present', function () {
        // Act
        service.onAssistanceResponse({
          id: '5eb19570-5567-44f0-ab55-95189383fab0',
          senderId: currentOrganization.id,
          beaconId: 'NOPE9999-63df-48bc-941c-9cc5f750367b'
        });

        // Assert
        expect(service.dataFromServer.beacons[0].responses.length).toBe(0);
      });

      describe('after a response message has been received', function() {
        var responseMessage = {
          id: '5eb19570-5567-44f0-ab55-95189383fab0',
          senderId: currentOrganization.id,
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
