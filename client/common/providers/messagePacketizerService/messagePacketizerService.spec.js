"use strict";

describe('the MessagePacketizerService', function() {
  var $rootScope
    , messagePacketizerService;

  beforeEach(module('modules.providers'));
  beforeEach(inject(function(_$injector_, _$rootScope_, _MessagePacketizerService_) {
    $rootScope = _$rootScope_;
    messagePacketizerService = _MessagePacketizerService_;
  }));

  it('should throw an error if $rootScope.$stateParams.id isn\'t defined', function() {
    // Arrange
    $rootScope.$stateParams = {};

    // Act/Assert
    expect(function() { messagePacketizerService.packetize(); }).toThrowError();
  });
});
