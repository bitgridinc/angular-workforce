"use strict";

require('./_module')
  .run(
    [          '$rootScope', '$stateParams', 'NavigationService',
      function ($rootScope,   $stateParams,   NavigationService) {

        // It's very handy to add references to NavigationService and $stateParams to the $rootScope
        // so that you can access them from any scope within your applications. For example:
        // <li ng-class="{ active: NavigationService.doesNavigationStateInclude('contacts.list') }">
        // will set the <li> to active whenever 'contacts.list' or one of its descendants is active.
        $rootScope.navigationService = NavigationService;
        $rootScope.$stateParams = $stateParams;
      }
    ]
  );
