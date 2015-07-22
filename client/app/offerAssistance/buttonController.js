"use strict";

var ButtonController = function(MessagePacketizerService, RestService, NavigationService) {
  this.respond = function(assistanceOffer) {
    // TODO: Prevent responding to a null beacon
    var message = MessagePacketizerService.packetize(assistanceOffer);
    RestService.offerAssistance(message);
    NavigationService.navigateTo('dashboard.beacons.list');
  };
};

ButtonController.$inject = ['MessagePacketizerService', 'RestService', 'NavigationService'];

require('./_module').controller('ButtonController', ButtonController);
