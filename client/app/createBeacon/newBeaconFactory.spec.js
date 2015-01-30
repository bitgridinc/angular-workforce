"use strict";

describe('the new beacon creation factory', function() {
  var scope,
      factory,
      messagePacketizer,
      restService;

  beforeEach(module('modules.createBeacon'));
  beforeEach(inject(function ($rootScope, _NewBeaconFactory_, MessagePacketizer, RestService) {
    scope = $rootScope.$new();
    factory = _NewBeaconFactory_;
    messagePacketizer = MessagePacketizer;
    restService = RestService;
  }));
  beforeEach(function () {
    spyOn(scope, '$on');
    factory.initScope(scope);
  });

  it ('should configure scope with the default values for a new project', function () {
    expect(scope.beaconPost.title).toBeDefined();
    expect(scope.beaconPost.description).toBeDefined();
    expect(scope.beaconPost.lat).toBeDefined();
    expect(scope.beaconPost.lng).toBeDefined();
  });
  it ('should set up a watch to be notified when the user clicks on the map', function () {
    expect(scope.$on).toHaveBeenCalledWith('leafletDirectiveMap.click', factory.onMapClicked);
  });

  describe ('after the scope values are changed', function () {
    var newTitle = 'New Title',
        newDescription = 'New Description',
        newLatitude = 1,
        newLongitude = 2;

    beforeEach(function () {
      scope.beaconPost.title = newTitle;
      scope.beaconPost.description = newDescription;
      scope.beaconPost.lat = newLatitude;
      scope.beaconPost.lng = newLongitude;
    });

    describe ('the method to post a new beacon', function () {
      var packetizedMessage = {
        title: newTitle,
        description: newDescription,
        lat: newLatitude,
        lng: newLongitude
      };

      beforeEach(function () {
        spyOn(messagePacketizer, 'packetize').and.returnValue(packetizedMessage);
        spyOn(restService, 'createBeacon');
        factory.postNewBeacon();
      });

      it ('should pass the scoped values to the packetizer', function () {
        expect(messagePacketizer.packetize).toHaveBeenCalledWith(packetizedMessage, undefined, undefined);
      });
      it ('should pass the packetized message data to the socket', function () {
        expect(restService.createBeacon).toHaveBeenCalledWith(packetizedMessage);
      });
    });
  });
});