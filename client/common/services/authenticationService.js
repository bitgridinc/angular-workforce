"use strict";

require('./_module_init.js')
  .service('AuthenticationService',
    function() {
      return {
        authenticate: function() {
          return {
            name: 'Macho Diggers'
          }
        }
      }
    }
  );
