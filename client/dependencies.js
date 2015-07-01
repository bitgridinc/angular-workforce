"use strict";

// _application
require('./bower_components/angular/angular');
require('./bower_components/angular-bootstrap/ui-bootstrap-tpls');
require('./bower_components/angular-strap/dist/angular-strap.min');
require('./bower_components/angular-strap/dist/angular-strap.tpl.min');
require('./bower_components/angular-ui-router/release/angular-ui-router');

// createBeacon
require('./bower_components/angular-elastic/elastic');

// dashboard
require('./bower_components/angular-jwt/dist/angular-jwt');

// map
require('./bower_components/leaflet/dist/leaflet-src');
require('./bower_components/angular-leaflet-directive/dist/angular-leaflet-directive');
// require('./bower_components/esri-leaflet/dist/esri-leaflet-src'); TODO: Why does it error?

// providers
window._ = require('./bower_components/lodash/dist/lodash');
window.io = require('./bower_components/socket.io-client/socket.io');
