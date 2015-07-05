"use strict";

function throwIfOutsideRange(value, minimum, maximum) {
  if (value < minimum || value > maximum) {
    throw new Error(value + ' exceeded the bounds of ' + minimum + ', ' + maximum);
  }
}

require('./../_module_init.js')
  .service('UsngService', // Note that the USNG and MGRS are equivalent when used with NAD83/WGS83 datum
    [         '$window',
      function($window) {
        return {
          LLtoUSNG: function(lat, lng) {
            // Ensure lat/lng are within contiguous US to more quickly recognize errors in short-term development
            throwIfOutsideRange(lat, 25, 49);
            throwIfOutsideRange(lng, 66, 125);
            return $window.mgrs.forward([lng, lat]);
          }
        };
      }
    ]
  );
