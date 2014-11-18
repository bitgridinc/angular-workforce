var hapi = require('hapi');

// Constants
var PORT = 8080;

// Create a server with a host, port, and options
var server = new hapi.Server('0.0.0.0', PORT);

// routes
server.route([
  // Expose the contents of public
  { method: 'GET', path: '/js/{path*}', handler: { directory: { path: './server/public/js' } } },
  { method: 'GET', path: '/stylesheets/{path*}', handler: { directory: { path: './server/public/stylesheets' } } },

  { method: 'GET', path: '/partials/{path*}', handler: { directory: { path: './app/views/partials' } } },
  { method: 'GET', path: '/bower/{path*}', handler: { directory: { path: './app/bower_components' } } },

  // Entry point to Angular application
  { method: 'GET', path: '/{path*}', handler: {file: './app/views/index.html'} }
]);

server.start();
console.log('Running on http://0.0.0.0:' + PORT);
