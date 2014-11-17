var hapi = require('hapi');

// Constants
var PORT = 8080;

// Create a server with a host, port, and options
var server = new hapi.Server('localhost', PORT);

// routes
server.route([        
  { method: 'GET', path: '/partials/{path*}', handler: { directory: { path: './app/views/partials' } } },
  { method: 'GET', path: '/stylesheets/{path*}', handler: { directory: { path: './public/stylesheets' } } },
  { method: 'GET', path: '/js/{path*}', handler: { directory: { path: './public/js' } } },
  { method: 'GET', path: '/bower/{path*}', handler: { directory: { path: './app/bower_components' } } },
  // Entry point to Angular application
  { method: 'GET', path: '/{path*}', handler: {file: './app/views/index.html'} }
]);

server.start();
console.log('Running on http://localhost:' + PORT);
