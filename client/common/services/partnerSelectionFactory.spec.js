"use strict";

describe('the factory used to associate partner organizations (e.g., laundromat) to a beacon', function() {
  var factory;

  beforeEach(module('modules.services'));

  beforeEach(inject(function (_PartnerSelectionFactory_) {
    factory = _PartnerSelectionFactory_;
  }));

  it('should not require any types of partners before a beacon is passed in', function () {
    expect(factory.requiredPartnerTypes).toEqual([]);
  });

  describe('the method used to select a beacon to modify', function() {
    it('should populate the required partner types to a fixed list because we don\'t have logic for changing it yet', function() {
      factory.selectBeacon({});
      expect(factory.requiredPartnerTypes).toEqual(['food', 'gas']);
    });
  });

  describe('once a beacon is selected', function() {
    var beacon = {
      selectedPartners: []
    };

    beforeEach(function() {
      factory.selectBeacon(beacon);
    });

    it('should not specify any selected partners yet', function() {
      expect(factory.selectedPartners).toEqual([]);
    });

    describe('the method used to select a partner', function() {
      var partner = {
        type: 'gas'
      };

      beforeEach(function() {
        factory.selectPartner(partner);
      });

      it('should add the partner to the temporary list of selected partners', function() {
        expect(factory.selectedPartners).toEqual([partner]);
      });
      it('should not add the partner to the beacon yet, as we haven\'t confirmed yet', function() {
        expect(beacon.selectedPartners).toEqual([]);
      });
      it('should update the list of required partners if the types match', function() {
        expect(factory.requiredPartnerTypes).toEqual(['food']);
      });
    });

    describe('the method used to confirm partner selections', function() {
      it('should throw an error as there is still a required type', function() {
        expect(function() { factory.confirmPartnerSelection(); }).toThrowError();
      });
    });

    describe('once all partners are selected', function() {
      beforeEach(function() {
        while(factory.requiredPartnerTypes.length > 0) {
          factory.selectPartner({
            type: factory.requiredPartnerTypes[0]
          });
        }
      });

      describe('the list of required partner types', function() {
        it('should be empty', function() {
          expect(factory.requiredPartnerTypes).toEqual([]);
        });
      });

      describe('the method used to confirm partner selections', function() {
        it('should copy partner selections onto the beacon', function() {
          factory.confirmPartnerSelection();
          expect(beacon.selectedPartners.length).toEqual(factory.selectedPartners.length);
        });
      });
    });
  });
});