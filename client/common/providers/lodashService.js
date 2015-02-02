"use strict";

var _ = require('../../bower_components/lodash/dist/lodash.js');

require('./_module_init.js')
  .service('_',
    function() {
      return _;
    }
  );
