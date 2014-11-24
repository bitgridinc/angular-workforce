var hapi = require('hapi');

// Constants
var PORT = 8080;

// Create a server with a host, port, and options
var server = new hapi.Server('0.0.0.0', PORT);

// routes
server.route([
  // Expose the contents of the compiled public files (e.g., bundle.js)
  { method: 'GET', path: '/js/{path*}', handler: { directory: { path: './server/public/js' } } },
  { method: 'GET', path: '/stylesheets/{path*}', handler: { directory: { path: './server/public/stylesheets' } } },

  { method: 'GET', path: '/templates/{path*}', handler: { directory: { path: './client/views/templates' } } },
  { method: 'GET', path: '/bower/{path*}', handler: { directory: { path: './client/bower_components' } } },

  // Entry point to Angular application
  { method: 'GET', path: '/{path*}', handler: {file: './client/views/index.html'} }
]);

server.start();
console.log('Running on http://0.0.0.0:' + PORT);
