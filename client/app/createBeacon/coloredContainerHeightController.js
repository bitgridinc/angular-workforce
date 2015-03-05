"use strict";

require('./_module')
  .controller('ColoredContainerHeightController',
    [         '$scope',
      function($scope) {
        var absoluteMinHeight = 130,
            descriptionTextareaHeight = 65,
            nonDescriptionTextareaHeight = absoluteMinHeight - descriptionTextareaHeight;
        $scope.coloredContainerHeight = absoluteMinHeight;
        $scope.$on('elastic:resize', function(event, element) {
          var newMinHeight = element[0].offsetHeight + nonDescriptionTextareaHeight;
          $scope.coloredContainerHeight = Math.max(absoluteMinHeight, newMinHeight);
        });
      }
    ]
  );
