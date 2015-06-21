"use strict";

require('./_module')
  .config(function Config($httpProvider, jwtInterceptorProvider) {
    jwtInterceptorProvider.urlParam = 'jwt';
    jwtInterceptorProvider.tokenGetter = ['$rootScope', 'config', function($rootScope, config) {
      if (config.url.substr(config.url.length - 5) === '.html') {
        return null;
      }

      return $rootScope.token;
    }];

    $httpProvider.interceptors.push('jwtInterceptor');
  });
