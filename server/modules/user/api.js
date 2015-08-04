"use strict";

var userDatabase = require('../../dal/users/userDatabase')
  , jwt = require('jsonwebtoken');

module.exports = {
  getAllUsers: {
    handler: function(request, reply) {
      //console.log('getAllUsers handler called with token: ', request.query.jwt);
      var profile = jwt.decode(request.query.jwt);

      userDatabase.getAllUsers(profile.token).then(function(json) {
        //console.log('getAllUsers handler returning');
        reply(json);
      });
    },
    app: {
      name: 'users'
    }
  }
};
