"use strict";

require('./../_module_init.js')
  .service('UserNavigationService',
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
  )
  .service('state',
  [         '$state',
    function($state) {
      console.log('HERE HERE');
      return {
        go: function(to, /**Object=*/params) {
          console.log('WHOA: Transitioning to state: ', to, params);
        }
      };
    }
  ]
);
