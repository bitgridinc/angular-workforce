"use strict";

require('./_module')
  .run(
    [          '$rootScope', '$stateParams', 'UserNavigationService',
      function ($rootScope,   $stateParams,   UserNavigationService) {

        // It's very handy to add references to UserNavigationService and $stateParams to the $rootScope
        // so that you can access them from any scope within your applications. For example:
        // <li ng-class="{ active: userNavigationService.doesUserNavigationStateInclude('contacts.list') }">
        // will set the <li> to active whenever 'contacts.list' or one of its descendants is active.
        $rootScope.userNavigationService = UserNavigationService;
        $rootScope.$stateParams = $stateParams;
      }
    ]
  );
