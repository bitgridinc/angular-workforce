"use strict";

describe('the offer assistance controller', function() {
  var $rootScope,
      $scope,
      $state,
      messageSender;

  beforeEach(module('modules.offerAssistance'));
  beforeEach(inject(function (_$rootScope_, _$controller_, _$state_, MessagePacketizer, MessageSender) {
    $rootScope = _$rootScope_;
    $scope = _$rootScope_.$new();
    $state = _$state_;
    messageSender = MessageSender;

    $rootScope.selectionState = {
      currentBeacon: {
        id: '1'
      }
    };
    $rootScope.requestService = {
      currentEntity: {
        id: '2'
      }
    };

    _$controller_('OfferAssistanceController', {
      $scope: $scope,
      $rootScope: $rootScope,
      $state: $state,
      MessagePacketizer: MessagePacketizer,
      MessageSender: messageSender
    })
  }));

  it ('should configure scope with the default values for an assistance offer', function () {
    expect($scope.assistanceOffer).toBeDefined();
    expect($scope.assistanceOffer.numResponders).toBeDefined();
    expect($scope.assistanceOffer.arrivalDate).toBeDefined();
  });

  describe ('after the scope values are changed', function () {
    var newNumResponders = 5,
        newArrivalDate = new Date();

    beforeEach(function () {
      $scope.assistanceOffer.numResponders = newNumResponders;
      $scope.assistanceOffer.arrivalDate = newArrivalDate;
    });
    beforeEach(function () {
      spyOn(messageSender, 'send');
      spyOn($state, 'go');
    });

    describe ('sending the assistance offer', function () {
      beforeEach(function () {
        $scope.respond(true);
      });

      it ('should pass the packetized message data to the socket', function () {
        expect(messageSender.send).toHaveBeenCalledWith({
          contents: {
            numResponders: newNumResponders,
            arrivalDate: newArrivalDate
          },
          senderId : $rootScope.requestService.currentEntity.id,
          rootMessageId : $rootScope.selectionState.currentBeacon.id
        });
      });
      it ('should change our page state', function () {
        expect($state.go).toHaveBeenCalled();
      });
    });

    describe ('cancelling the assistance offer', function () {
      beforeEach(function () {
        $scope.respond(false);
      });

      it ('should not make a socket call', function () {
        expect(messageSender.send).not.toHaveBeenCalled();
      });
      it ('should change our page state', function () {
        expect($state.go).toHaveBeenCalled();
      });
    });
  });
});
