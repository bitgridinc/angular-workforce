"use strict";

require('./_module_init.js')
  .service('state',
    [         '$state',
      function($state) {
        return {
          go: function(to, /**Object=*/params) {
            console.log('Transitioning to state: ', to, params);
            $state.go(to, params);
          }
        };
      }
    ]
  );
