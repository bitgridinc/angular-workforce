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

  // Expose our templates
  { method: 'GET', path: '/templates/dashboard/{file}',
    handler: { directory: { path: './client/app/dashboard' } },
    config: { validate: { params: { file: templateValidator } } }
  },
  { method: 'GET', path: '/templates/leaflet/{file}',
    handler: { directory: { path: './client/app/leaflet' } },
    config: { validate: { params: { file: templateValidator } } }
  },

  //{ method: 'GET', path: '/templates/{path*}', handler: { directory: { path: './client/views/templates' } } },
  { method: 'GET', path: '/templates/directives/{path*}', handler: { directory: { path: './client/views/templates/directives' } } },
  { method: 'GET', path: '/bower/{path*}', handler: { directory: { path: './client/bower_components' } } },

  // Entry point to Angular application
  { method: 'GET', path: '/{path*}', handler: {file: './client/views/index.html'} }
]);

server.start();
console.log('Running on http://0.0.0.0:' + PORT);
