"use strict";

var apiRoutes = require('../shared/apiRoutes');
var templateValidator = require('joi').string().regex(/\.tpl\.html$/, 'template');
var authApi = require('./api/auth/api');
var userApi = require('./api/user/api');

module.exports = function(api) {
  return [
    { method: 'POST', path: apiRoutes.login, config: authApi.login },
    { method: 'POST', path: apiRoutes.createBeacon, config: api.createBeacon },
    { method: 'POST', path: apiRoutes.offerAssistance, config: api.offerAssistance },
    { method: 'POST', path: apiRoutes.acceptAssistance, config: api.acceptAssistance },
    { method: 'GET', path: apiRoutes.getAllUsers, config: userApi.getAllUsers },

    // Expose the public folder
    { method: 'GET', path: '/js/{path*}', handler: { directory: { path: './public/js' } } },
    { method: 'GET', path: '/css/{path*}', handler: { directory: { path: './public/css' } } },
    { method: 'GET', path: '/images/{path*}', handler: { directory: { path: './public/images' } } },
    { method: 'GET', path: '/fonts/{path*}', handler: { directory: { path: './public/fonts' } } },

    // Expose our feature templates
    { method: 'GET', path: '/templates/_application/{file}',
      handler: { directory: { path: '../client/app/_application' } },
      config: { validate: { params: { file: templateValidator } } }
    },
    { method: 'GET', path: '/templates/beaconControl/{file}',
      handler: { directory: { path: '../client/app/beaconControl' } },
      config: { validate: { params: { file: templateValidator } } }
    },
    { method: 'GET', path: '/templates/beaconDetails/{file}',
      handler: { directory: { path: '../client/app/beaconDetails' } },
      config: { validate: { params: { file: templateValidator } } }
    },
    { method: 'GET', path: '/templates/createBeacon/{file}',
      handler: { directory: { path: '../client/app/createBeacon' } },
      config: { validate: { params: { file: templateValidator } } }
    },
    { method: 'GET', path: '/templates/dashboard/{file}',
      handler: { directory: { path: '../client/app/dashboard' } },
      config: { validate: { params: { file: templateValidator } } }
    },
    { method: 'GET', path: '/templates/header/{file}',
      handler: { directory: { path: '../client/app/header' } },
      config: { validate: { params: { file: templateValidator } } }
    },
    { method: 'GET', path: '/templates/listBeacons/{file}',
      handler: { directory: { path: '../client/app/listBeacons' } },
      config: { validate: { params: { file: templateValidator } } }
    },
    { method: 'GET', path: '/templates/login/{file}',
      handler: { directory: { path: '../client/app/login' } },
      config: { validate: { params: { file: templateValidator } } }
    },
    { method: 'GET', path: '/templates/map/{file}',
      handler: { directory: { path: '../client/app/map' } },
      config: { validate: { params: { file: templateValidator } } }
    },
    { method: 'GET', path: '/templates/offerAssistance/{file}',
      handler: { directory: { path: '../client/app/offerAssistance' } },
      config: { validate: { params: { file: templateValidator } } }
    },
    { method: 'GET', path: '/templates/profile/{file}',
      handler: { directory: { path: '../client/app/profile' } },
      config: { validate: { params: { file: templateValidator } } }
    },
    { method: 'GET', path: '/templates/reviewAssistance/{file}',
      handler: { directory: { path: '../client/app/reviewAssistance' } },
      config: { validate: { params: { file: templateValidator } } }
    },

    // Expose our directive templates
    { method: 'GET', path: '/templates/directives/templates/{file}',
      handler: { directory: { path: '../client/common/directives/templates' } },
      config: { validate: { params: { file: templateValidator } } }
    },

    // Expose our bower components so we can get at the css files within
    { method: 'GET', path: '/bower/{path*}', handler: { directory: { path: '../client/bower_components' } } },

    // Expose the entry point to the Angular application
    { method: 'GET', path: '/{path?}', handler: {file: '../client/app/_application/_shell.html'} }
  ]
};
