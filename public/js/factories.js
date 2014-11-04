"use strict";

angular.module('app').factory('beaconService', function() {
  return {
    create: function(beacon) {
      // We do a $http post to send the new beacon
      alert("The beacon has been created.");
    }
  };
});
