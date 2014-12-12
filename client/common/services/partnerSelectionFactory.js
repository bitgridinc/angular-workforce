"use strict";

var _ = require('../../bower_components/lodash/dist/lodash.js');
var app = require('./_module_init.js');

app.service('PartnerSelectionFactory', function() {
  return {
    beacon: undefined,
    requiredPartnerTypes: [],
    selectedPartners: [],
    selectBeacon: function(beacon) {
      this.beacon = beacon;
      this.requiredPartnerTypes.push('food');
      this.requiredPartnerTypes.push('gas');
    },
    selectPartner: function(partner) {
      this.selectedPartners.push(partner);
      _.pull(this.requiredPartnerTypes, partner.type);
    },
    confirmPartnerSelection: function() {
      if (this.requiredPartnerTypes.length > 0) {
        throw Error();
      }
      this.beacon.selectedPartners = this.selectedPartners;
    }
  }
});