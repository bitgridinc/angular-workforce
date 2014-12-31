"use strict";

angular
  .module('modules.offerAssistance', [])
  .config(
    [         '$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('dashboard.mycompany.detail.assist', {
            name: 'dashboard.mycompany.detail.assist',
            parent: 'dashboard.mycompany.detail',
            url: '/assist',
            views: {
              // TODO: Why do I have to specify the absolute path only within offerAssistance and reviewAssistance,
              // TODO: which both happen to be grandchildren of dashboard.mycompany and are targetting 'right'.
              'right@dashboard.mycompany': {
                templateUrl: 'templates/offerAssistance/view.tpl.html',
                controller: 'OfferAssistanceController'
              }
            }
          });
      }
    ]
  )
  .controller('OfferAssistanceController',
    [         '$scope', '$rootScope', '$state', 'MessageSender',
      function($scope,   $rootScope,   $state,   MessageSender) {
        // For debugging purposes
        $scope.name = 'OfferAssistanceController';
        $scope.selectionState = $rootScope.selectionState;
        $scope.assistanceOffer = {
          numResponders: 2,
          arrivalDate: new Date()
        };

        $scope.open = function($event) {
          console.log("open called.", $event);
          $event.preventDefault();
          $event.stopPropagation();

          $scope.opened = true;
        };

        $scope.respond = function(assist) {
          console.log("You've responded to a beacon with", assist);
          if (assist) {
            // TODO: Prevent responding to a null beacon
            // TODO: Implement treeId
            MessageSender.send($scope.assistanceOffer, undefined, undefined);
          }
          $state.go('^');
        };
      }
    ]
  );
