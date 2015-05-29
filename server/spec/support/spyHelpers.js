"use strict";

function createSpyThatReturns(functionName, response){
  var spy = jasmine.createSpy(functionName);
  spy.and.callFake(function(params, callback) {
    callback(undefined, response);
  });
  return spy;
}

module.exports.createGeoservicesSpy = function(responses) {
  var spiesToReturn = {
    moduleSpy: jasmine.createSpyObj('geoservices', ['featureservice']),
    moduleFunction: undefined
  };

  spiesToReturn.moduleSpy = jasmine.createSpyObj('geoservices', ['featureservice']);
  spiesToReturn.moduleSpy.featureservice.and.callFake(function(options, callback) {
    callback();
  });

  // Create a spy for the geoservices.featureservice.prototype.add function, used to create beacons
  spiesToReturn.moduleSpy.featureservice.prototype.add = createSpyThatReturns('add', responses.add);
  // Create a spy for the geoservices.featureservice.prototype.query function, used to get beacons
  spiesToReturn.moduleSpy.featureservice.prototype.query = createSpyThatReturns('query', responses.query);

  // When the geoservices module is newed up, return our spy object
  spiesToReturn.moduleFunction = function() {
    return spiesToReturn.moduleSpy;
  };

  return spiesToReturn;
};
