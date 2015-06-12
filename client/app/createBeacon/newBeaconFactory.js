"use strict";

require('./_module')
  .factory('NewBeaconFactory',
    [         '$rootScope', 'RestService', 'GeocoderService', 'FluentSharedLibrariesService',
      function($rootScope,   RestService,   GeocoderService,   FluentSharedLibrariesService) {
        var scope;
        return {
          initScope: function ($scope) {
            scope = angular.extend($scope, {
              beaconData: {
                title: undefined,
                description: undefined,
                streetAddress: undefined,
                zip: undefined,
                numberOfPeople: undefined
              }
            });
          },
          postNewBeacon : function (recipientIds) {
            GeocoderService.geocodeAddress(scope.beaconData.streetAddress, scope.beaconData.zip, function(address) {
              var beaconPost = FluentSharedLibrariesService.newBeaconPostFactory()
                .withSenderId($rootScope.dataFromServer.currentOrganization.id)
                .withSummaryText(scope.beaconData.title, scope.beaconData.description)
                .withLocation(address.lat, address.lng)
                .withAddress(address.streetAddress)
                .withNumberOfPeople(scope.beaconData.numberOfPeople)
                .withRecipientIds(recipientIds)
                .createBeaconPost();
              RestService.createBeacon(beaconPost).then(function(result) {
                console.log('GOT RESULT: ', result);
                alert("The server returned: " + result.statusText);
              });
            });
          }
        };
      }
    ]
  );
