"use strict";

require('./../_module_init.js')
  // Allow DI for use in controllers, unit tests
  .constant('_', window._)
  // Use in views, ng-repeat="x in _.range(3)"
  .run(function($rootScope) {
      $rootScope._ = window._;
    }
  );
