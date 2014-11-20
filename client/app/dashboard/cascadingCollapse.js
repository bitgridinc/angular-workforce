"use strict";

angular.module('dashboard.cascadingCollapse', [])

  .controller('CascadingCollapseCtrl', function($scope) {
    function CascadingCollapse() {
      var showMidColumn = true;
      var showRightColumn = true;

      this.__defineGetter__("showMidColumn", function() {
        return showMidColumn;
      });

      this.__defineGetter__("showRightColumn", function() {
        return showRightColumn;
      });

      this.__defineSetter__("showMidColumn", function(value) {
        showMidColumn = value;
        if (value === false) {
          showRightColumn = false;
        }
      });

      this.__defineSetter__("showRightColumn", function(value) {
        showRightColumn = value;
      });
    }

    angular.extend($scope, {
      cascadingCollapse: new CascadingCollapse()
    });
  });