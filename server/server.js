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

// Set up the server
var Hapi = require('hapi');
var server = new Hapi.Server();
server.connection({ address: '0.0.0.0', port: 8080 });

// Set up socket.io and dependant modules
var sioServer = require('socket.io').listen(server.listener);
require('./socketController')(sioServer);
var api = require('./api')(sioServer);

// Wire up the server routes
server.route(require('./serverRoutes')(api));

console.log('Running on ' + server.connections[0].info.uri);
server.start();
