"use strict";

require('./_module')
  .config(
    [         '$urlRouterProvider',
      function($urlRouterProvider) {
        $urlRouterProvider.otherwise('/dashboard');

        $urlRouterProvider.rule(function($injector, $location) {
          $injector.invoke(['$rootScope', 'RedirectUrlParserService', function($rootScope, RedirectUrlParserService) {
            $rootScope.user = RedirectUrlParserService.parse($location.path());
          }]);
        });

        // Normally, the '#' is used to implement routing in the url of a single-page application as changes in the
        // comment don't trigger a page load. HTML5 mode allows for this same routing but native in the browser. There are
        // two problems, though. First, browser support for this isn't consistent. Second, we would need to update the
        // server to serve our application on every possible route within the application (because a user pasting in a
        // copied url shouldn't get a 404). The downside is that we have a '#' in our urls. Big whoop.
        //$locationProvider.html5Mode(true);
      }
    ]
  );
