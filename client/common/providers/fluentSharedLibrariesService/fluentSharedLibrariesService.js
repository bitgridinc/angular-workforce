"use strict";

var factories = require('../../../../shared/factories');

require('./../_module_init.js')
  .service('FluentSharedLibraries',
    function() {
      return factories;
    }
  );
