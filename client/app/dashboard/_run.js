"use strict";

// Redirect to /login if the user isn't logged in
require('./_module')
  .run(
    [          '$rootScope', '$location',
      function ($rootScope,   $location) {
        $rootScope.$on('$stateChangeStart', function(e, to) {
          if (to.data && to.data.requiresLogin) {
            if (!$rootScope.token) {
              e.preventDefault(); // Don't transition to state 'to'
              // Pass the intended url along to navigate to after login
              $rootScope.navigationService.navigateTo('login', { to: $location.url() });
            }
          }
        });
      }
    ]
  );
