"use strict";

var _ = require('lodash')
  , client = new (require('geoservices'))();

module.exports = {
  makeRequest: function(request) {
    // The geoservices library bugged when I wasn't using bind. The this keyword wasn't referencing the prototype.
    _.bind(client.featureservice, client.featureservice.prototype)({
        url: "http://services5.arcgis.com/yk7EooUDkOKQA9zj/ArcGIS/rest/services/beacons/FeatureServer/0"
      }, function (err/*, result*/) {
        if (err) {
          console.log("ERROR accessing Feature Service: ", err);
          throw new Error(err);
        } else {
          request(client.featureservice);
        }
      });
  },
  queryFeatures: function(queryParams, successCallback) {
    this.makeRequest(function(featureServer) {
      featureServer.prototype.query(queryParams, function(err, result) {
        if (err) {
          console.log("ERROR querying feature service: ", err);
          throw new Error(err);
        } else {
          //console.log("queryFeatures returning # of features: ", result.features.length);
          successCallback(result.features);
        }
      });
    });
  }
};