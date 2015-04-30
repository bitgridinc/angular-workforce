"use strict";

require('./_module')
  .controller('CalendarController',
    [         '$scope',
      function($scope) {
        $scope.openCalendar = function($event) {
          $event.preventDefault();
          $event.stopPropagation();
          $scope.calendarOpened = $scope.calendarOpened ? false : true;
        };
      }
    ]
  );
