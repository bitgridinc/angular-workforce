"use strict";

var app = require('./_module_init.js');

app.service('AuthenticationService',
  [
    function() {
      return {
        authenticate: function() {
          return {
            name: 'Macho Diggers'
          }
        }
      }
    }
  ]
);
