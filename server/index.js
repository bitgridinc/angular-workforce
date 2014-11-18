var hapi = require('hapi');

// Constants
var PORT = 8080;

// Create a server with a host, port, and options
var server = new hapi.Server('0.0.0.0', PORT);

// routes
server.route([
  // Expose the contents of the compiled public files (e.g., bundle.js)
  { method: 'GET', path: '/**/{path*}', handler: { directory: { path: './server/public' } } },

  { method: 'GET', path: '/partials/{path*}', handler: { directory: { path: './app/views/partials' } } },
  { method: 'GET', path: '/bower/{path*}', handler: { directory: { path: './app/bower_components' } } },

  // Entry point to Angular application
  { method: 'GET', path: '/{path*}', handler: {file: './app/views/index.html'} }
]);

server.start();
console.log('Running on http://0.0.0.0:' + PORT);
