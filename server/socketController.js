/* jslint node: true */
'use strict';

var io = require('./socketSetup').instance;
var beaconDatabase = require('./esri/beaconDatabase/beaconDatabase');
var entityStorage = require('./entities/entityStorage');
var AGO = require('esri-portal-api');

io.sockets.on('connection', function(client){
  var clientEntity = entityStorage.getCurrentEntity();
  client.join(clientEntity.id);

  var ago = new AGO();
  var promise = ago.portal.users(
    '37W9Inry7s67fJJdUY8tWrD4gFED0kDYAUeDeJeUex4Tk_tTa_R5vxxg5gfVVwkL6pOoL3LdcaPQPyG-pX4sonzFPmLno1GtzP7e2RJKp_O5tp-g9Zasvjc21J3-KjREd5qKwync-k-zDt8mrC7eCxg2F2iQBnNh7IGzg-wJTfdC0E4BWWQZeowsRkOt0cwe',
    'self');

  beaconDatabase.getAllBeacons(function (beacons) {
    promise.then(function(json) {
      // While I could just do client.emit(..., this is useful way to remembering how to address a specific client.
      io.to(clientEntity.id).emit('init', {
        allEntities: entityStorage.getAllEntities(),
        currentEntity: clientEntity,
        beacons: beacons,
        json: json
      });
    });
  });
});
