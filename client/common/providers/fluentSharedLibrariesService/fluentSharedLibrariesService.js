"use strict";

var factories = require('../../../../shared/factories');

require('./../_module_init.js')
  .service('FluentSharedLibrariesService',
    function() {
      return factories;
    }
  );
