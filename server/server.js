// This code is very important. The server is configured to run out of the /server directory, not the root directory.
// I did this initially for the benefit of nodemon; when starting out of /server, nodemon only needed to watch ~20 files
// for changes rather than ~20k. However, this posed a problem when deploying to Nodejitsu where I *must* run out of the
// root. By ensuring that this file is always running within /server, we can keep the remainder of the code the same.
console.log('Starting directory: ' + process.cwd());
try {
  process.chdir(__dirname);
  console.log('New directory: ' + process.cwd());
}
catch(err) {
  console.log('chdir: ' + err);
}

var hapi = require('hapi');
var apiRoutes = require('../shared/apiRoutes');
var templateValidator = require('joi').string().regex(/\.tpl\.html$/, 'template');

var PORT = 8080;
var server = new hapi.Server('0.0.0.0', PORT);
require('./socketSetup')(server);

// Note that these must come after server is passed to socketSetup above.
var api = require('./api');
require('./socketController');

// TODO: Break out into a routes file
server.route([
  /*{ method: 'GET', path: '/beacons', config: api.getBeacons },*/
  { method: 'POST', path: apiRoutes.createBeacon, config: api.createBeacon },
  { method: 'POST', path: apiRoutes.offerAssistance, config: api.offerAssistance },
  { method: 'POST', path: apiRoutes.acceptAssistance, config: api.acceptAssistance },

  // Expose the public folder
  { method: 'GET', path: '/js/bundle.js', handler: { file: './public/js/bundle.js' } },
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
  { method: 'GET', path: '/{path?}', handler: {file: '../client/app/_application/applicationShell.html'} }
]);

server.start();
console.log('Running on http://0.0.0.0:' + PORT);
