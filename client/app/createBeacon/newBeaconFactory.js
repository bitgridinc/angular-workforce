"use strict";

require('./_module')
  .factory('NewBeaconFactory',
    [         '$rootScope', 'RestService', 'FluentSharedLibrariesService',
      function($rootScope,   RestService,   FluentSharedLibrariesService) {
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
            var senderId = $rootScope.dataFromServer.currentOrganization.id
              , title = scope.beaconData.title
              , description = scope.beaconData.description;
            var beaconPost = FluentSharedLibrariesService.newBeaconPostFactory()
              .withRequired(senderId, title, description, 37, -76)
              .withAddress(scope.beaconData.streetAddress, scope.beaconData.zip)
              .withNumberOfPeople(scope.beaconData.numberOfPeople)
              .withRecipientIds(recipientIds)
              .createBeaconPost();
            return RestService.createBeacon(beaconPost);
          }
        };
      }
    ]
  );
