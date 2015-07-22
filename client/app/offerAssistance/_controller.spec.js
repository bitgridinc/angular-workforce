"use strict";

describe('the offer assistance controller', function() {
  var sut;

  beforeEach(module('modules.offerAssistance'));
  beforeEach(inject(function(_$controller_) {
    sut = _$controller_('OfferAssistanceController');
  }));

  it ('should configure scope with the assistance offer object', function () {
    expect(sut.assistanceOffer).toBeDefined();
  });
});
