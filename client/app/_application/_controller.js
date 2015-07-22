"use strict";

// This controller wires up the $rootScope for consumption by the entire application.
var AppController = function($rootScope, _) {
  var _this = this;
  _this.find = _.find;

  $rootScope.dataFromServer = {
    allOrganizations: [],
    currentOrganization: {},
    beacons: []
  };

  $rootScope.findOrganizationById = function(id) {
    return _this.findOrganizationById($rootScope.dataFromServer.allOrganizations, id);
  };

  $rootScope.findBeaconById = function(id) {
    return _this.findBeaconById($rootScope.dataFromServer.beacons, id);
  };
};

AppController.prototype.findOrganizationById = function(allOrganizations, id) {
  console.log('Finding organization by id: ', id, allOrganizations);
  return this.find(allOrganizations, function(organization) {
    return organization.id === id;
  });
};

AppController.prototype.findBeaconById = function(allBeacons, id) {
  console.log('Finding beacon by id: ', id, allBeacons);
  return this.find(allBeacons, function(beacon) {
    return beacon.id === id;
  });
};

AppController.$inject = ['$rootScope', '_'];

require('./_module').controller('AppController', AppController);
