var hapi = require('hapi');

// Constants
var PORT = 8080;

// Create a server with a host, port, and options
var server = new hapi.Server('localhost', PORT);

// routes
server.route([        
  { method: 'GET', path: '/partials/{path*}', handler: { directory: { path: './app/views/partials' } } }, 
  { method: 'GET', path: '/js/{path*}', handler: { directory: { path: './app/js' } } },
  { method: 'GET', path: '/vendor/{path*}', handler: { directory: { path: './app/vendor' } } },
  { method: 'GET', path: '/bower/{path*}', handler: { directory: { path: './app/bower_components' } } },
  // Entry point to Angular application
  { method: 'GET', path: '/{path*}', handler: {file: './app/views/index.html'} },
  // Entry point to Mocha tests
  { method: 'GET', path: '/tests/{path*}', handler: {file: './app/views/tests.html'} }
]);

server.start();
console.log('Running on http://localhost:' + PORT);
