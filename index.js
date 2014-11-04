var hapi = require('hapi');

// Constants
var PORT = 8080;

// Create a server with a host, port, and options
var server = new hapi.Server('localhost', PORT);

// routes
server.route([        
  { method: 'GET', path: '/partials/{path*}', handler: { directory: { path: './public/views/partials' } } }, 
  { method: 'GET', path: '/js/{path*}', handler: { directory: { path: './public/js' } } },
  // serve index as entry point into angular app
  { method: 'GET', path: '/{path*}', handler: {file: './public/views/index.html'} }
]);

server.start();
console.log('Running on http://localhost:' + PORT);
