"use strict";

var _ = require('../../bower_components/lodash/dist/lodash.js');

require('./_module_init.js')
  // TODO: Why is this a service but named factory?
  .service('PartnerSelectionFactory',
    function() {
      return {
        beacon: undefined,
        requiredPartnerTypes: [],
        selectedPartners: [],
        selectBeacon: function(beacon) {
          this.beacon = beacon;
          _.merge(this.requiredPartnerTypes, ['food', 'gas']);
        },
        selectPartner: function(partner) {
          this.selectedPartners.push(partner);
          _.pull(this.requiredPartnerTypes, partner.type);
        },
        deselectPartner: function(partner) {
          _.pull(this.selectedPartners, partner);
          if (_.indexOf(this.requiredPartnerTypes, partner.type) === -1) {
            this.requiredPartnerTypes.push(partner.type);
          }
        },
        confirmPartnerSelection: function() {
          if (this.requiredPartnerTypes.length > 0) {
            throw Error();
          }
          this.beacon.selectedPartners = this.selectedPartners;
        }
      }
    }
  );