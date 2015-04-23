"use strict";

require('./_module')
  .service('SocketHandlerService',
    [         '_',
      function(_) {
        return {
          dataFromServer: undefined,
          initialize: function(dataFromServer) {
            console.log('Initializing dataFromServer in the socketHandlerService', dataFromServer);
            this.dataFromServer = dataFromServer;
          },
          onInit: function(data) {
            console.log('onInit called with: ', data);
            angular.copy(data, this.dataFromServer);
          },
          onNewBeacon: function(request) {
            console.log('onNewBeacon called with', request, this.dataFromServer);

            var existingBeacon = _.find(this.dataFromServer.beacons, function(beacon) {
              return beacon.id === request.id;
            });
            if (angular.isDefined(existingBeacon)) {
              console.log('Beacon already exists: ', existingBeacon);
              return;
            }

            this.dataFromServer.beacons.push(request);
          },
          onAssistanceResponse: function(request) {
            console.log('onAssistanceResponse called with', request, this.dataFromServer, this);

            var existingBeacon = _.find(this.dataFromServer.beacons, function(beacon) {
              return beacon.id === request.beaconId;
            });
            if (angular.isUndefined(existingBeacon)) {
              // TODO: Ideally, the server will never send these responses.
              console.log('Beacon doesn\'t exist, cannot add response: ', request.beaconId);
              return;
            }

            var existingResponse = _.find(existingBeacon.responses, function(response) {
              return response.id === request.id;
            });
            if (angular.isDefined(existingResponse)) {
              console.log('Response already exists on beacon, cannot add it: ', request.id, existingBeacon);
              return;
            }

            existingBeacon.responses.push(request);
          },
          // TODO: Add tests for this method
          onAcceptedAssistance: function(request) {
            console.log('onAcceptedAssistance called with', request);

            var existingBeacon = _.find(this.dataFromServer.beacons, function(beacon) {
              return beacon.id === request.beaconId;
            });
            if (angular.isUndefined(existingBeacon)) {
              // TODO: Ideally, the server will never send these responses.
              console.log('Beacon doesn\'t exist, cannot add response: ', request.beaconId);
              return;
            }

            var acceptedResponse = _.remove(existingBeacon.responses, function(response) {
              return response.id === request.responseId;
            })[0];
            if (angular.isUndefined(acceptedResponse)) {
              console.log('Response doens\'t exist in the responses array, cannot accept it: ', request.responseId, existingBeacon);
              return;
            }

            console.log('Moving response from pending to accepted: ', acceptedResponse);
            existingBeacon.acceptedAssistance.push(acceptedResponse);
          }
        };
      }
    ]
  );