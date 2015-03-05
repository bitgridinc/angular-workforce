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
                city: undefined,
                numberOfPeople: undefined
              }
            });
          },
          postNewBeacon : function (recipientIds) {
            // TODO: Consider returning ALL errors at once
            if (!angular.isDefined(scope.beaconData.title)) {
              alert('Title is required.');
            } else if (!angular.isDefined(scope.beaconData.description)) {
              alert('Description is required.');
            } else if (!angular.isDefined(scope.beaconData.numberOfPeople)) {
              alert('Number of People is required.');
            } else {
              GeocoderService.geocodeAddress(scope.beaconData.streetAddress, scope.beaconData.city, function(address) {
                var beaconPost = FluentSharedLibrariesService.newBeaconPostFactory()
                  .withSenderId($rootScope.dataFromServer.currentEntity.id)
                  .withSummaryText(scope.beaconData.title, scope.beaconData.description)
                  .withLocation(address.lat, address.lng)
                  .withAddress(address.streetAddress)
                  .withNumberOfPeople(scope.beaconData.numberOfPeople)
                  .withRecipientIds(recipientIds)
                  .createBeaconPost();
                RestService.createBeacon(beaconPost);
              });
            }
          }
        };
      }
    ]
  );