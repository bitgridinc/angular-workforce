var hapi = require('hapi');
var templateValidator = require('joi').string().regex(/\.tpl\.html$/, 'template');

// Constants
var PORT = 8080;

// Create a server with a host, port, and options
var server = new hapi.Server('0.0.0.0', PORT);

// routes
server.route([
  // Expose the public folder
  { method: 'GET', path: '/js/bundle.js', handler: { file: './server/public/js/bundle.js' } },
  { method: 'GET', path: '/stylesheets/{path*}', handler: { directory: { path: './server/public/stylesheets' } } },

  // Expose our feature templates
  { method: 'GET', path: '/templates/control/{file}',
    handler: { directory: { path: './client/app/control' } },
    config: { validate: { params: { file: templateValidator } } }
  },
  { method: 'GET', path: '/templates/createBeacon/{file}',
    handler: { directory: { path: './client/app/createBeacon' } },
    config: { validate: { params: { file: templateValidator } } }
  },
  { method: 'GET', path: '/templates/dashboard/{file}',
    handler: { directory: { path: './client/app/dashboard' } },
    config: { validate: { params: { file: templateValidator } } }
  },
  { method: 'GET', path: '/templates/listBeacons/{file}',
    handler: { directory: { path: './client/app/listBeacons' } },
    config: { validate: { params: { file: templateValidator } } }
  },
  { method: 'GET', path: '/templates/map/{file}',
    handler: { directory: { path: './client/app/map' } },
    config: { validate: { params: { file: templateValidator } } }
  },

  // Expose our directive templates
  { method: 'GET', path: '/templates/directives/{file}',
    handler: { directory: { path: './client/common/directives' } },
    config: { validate: { params: { file: templateValidator } } }
  },

  // Expose our bower components so we can get at the css files within
  { method: 'GET', path: '/bower/{path*}', handler: { directory: { path: './client/bower_components' } } },

  // Expose the entry point to the Angular application
  { method: 'GET', path: '/{path?}', handler: {file: './client/app/app.html'} }
]);

server.start();
console.log('Running on http://0.0.0.0:' + PORT);
