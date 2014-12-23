"use strict";

var db = require('./database');
var helpers = require('../helpers');

function save(id, value, callback) {
  console.log('save called', id, value);
  db.put(id, value, function(err) {
    if (err) {
      console.log('Create failed: ', err);
    }
    callback(err, value);
  });
}

module.exports = {
  getBeacons: function(callback){
    var beacons = [];
    db.createReadStream()
      .on('data', function(data) {
        console.log(data.key, '=', data.value);
        beacons.push(data.value);
      })
      .on('error', function(err) {
        console.log('Oh my!', err);
        callback(err, null);
      })
      .on('close', function() {
        console.log('Stream closed');
        callback(null, beacons);
      })
      .on('end', function() {
        console.log('Stream closed');
        callback(null, beacons);
      });
  },
  createBeacon: function(organization, title, description, lat, lng, callback){
    var beaconId = helpers.guid();
    var beacon = {
      id: beaconId,
      organization: organization,
      title: helpers.toTitleCase(title),
      description: description,
      lat: lat,
      lng: lng,
      responses: [],
      acceptedAssistance: []
    };
    save(beaconId, beacon, callback);
  }
};
