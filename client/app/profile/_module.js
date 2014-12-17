"use strict";

var app = angular.module('modules.profile', []);

app.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('profile', {
      name: 'profile',
      url: '/profile',
      templateUrl: 'templates/profile/view.tpl.html',
      controller: 'ProfileController'
    });
}]);

app.controller('ProfileController', function($scope, $rootScope) {
  console.log($rootScope.organization);
  $scope.organization = $rootScope.organization;
});
