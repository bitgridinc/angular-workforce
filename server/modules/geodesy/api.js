"use strict";

var converter = require('../../../node_modules/coordinator/coordinator.js');

module.exports = {
  latLngToUsng: {
    handler: function(request, reply) {
      console.log('WHOA', converter);
      var latLngToUsng = converter('latlong', 'mgrs');
      console.log('WHOA2', latLngToUsng);
      reply(latLngToUsng(request.lat, request.lng, 5));
    },
    app: {
      name: 'geodesy'
    }
  }
};
