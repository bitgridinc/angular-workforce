"use strict";

var http = require('http')
  , request = require('request')
  , proxyquire = require('proxyquire')
  , specData = require('./socketController.integration.specData.js')
  , spyHelpers = require('./support/spyHelpers')
  , environment = require('../environment')
  , _ = require('lodash');

describe('in production,', function() {
  var mode;
  beforeEach(function() {
    mode = environment.getCurrentMode();
    environment.changeToProductionMode();
  }); // Ensure each test runs in production mode
  afterEach(function() {
    environment.changeToMode(mode);
  }); // Reset back to whatever the mode was before the test was run

  describe('the socketController', function() {
    var geoservicesSpy;
    beforeEach(function() {
      geoservicesSpy = spyHelpers.createGeoservicesSpy({
        query: specData.esriGetFeaturesResponse
      });
    }); // Stub the geoservices API with 2 beacons

    var socketIoSpy
      , socketSpy;
    beforeEach(function() {
      // Create a socket.io client spy
      socketSpy = jasmine.createSpyObj('client', ['join', 'emit']);

      // We need to spy on the sockets.on function and call the callback to act as if the listener was hit
      var socketsSpyObj = jasmine.createSpyObj('sockets', ['on']);
      socketsSpyObj.on.and.callFake(function(name, callback) {
        callback(socketSpy);
      });

      // We don't want to send socket.io messages, so create a spy for the 'to' and 'emit' functions
      var toSpy = jasmine.createSpy('to');
      var emitSpy = jasmine.createSpy('emit');
      socketIoSpy = {
        sockets: socketsSpyObj,
        to : toSpy.and.returnValue({
          emit: emitSpy
        })
      };
    }); // Spy on socket.io

    var sut;
    beforeEach(function() {
      // Proxyquire recommends I don't do this, but it's required for an integration test. I'm proxying requires many
      // levels down, and proxyquire only goes one level deep by default (it's normally used for unit testing). See:
      // https://www.npmjs.com/package/proxyquire#caveat
      geoservicesSpy.moduleFunction['@global'] = true;
      specData.messages['@global'] = true;

      // We must create the spies before we require in the api, as it is in the api's require statements that the
      // code in which we are spying is used
      sut = proxyquire('../socketController', {
        'geoservices': geoservicesSpy.moduleFunction,
        './messageDatabase.prod.js': specData.messages
      })(socketIoSpy);
    }); // Proxyquire the SUT, passing in our stubbed geoservices module and 2 test messages, one for each beacon

    describe('socket.io', function() {
      it('shall be set to listen for \'connection\' messages', function() {
        expect(socketIoSpy.sockets.on.calls.allArgs()[0][0]).toBe('connection');
      });

      describe('after a client has connected', function() {
        it('shall be joined to a socket.io room by its organization id', function() {
          expect(socketSpy.join.calls.allArgs()[0][0]).toBe('7a95759f-3df8-4f16-bb43-24f4329fe3df');
        });
        it('shall be passed an init message containing organization and beacon information', function() {
          // Arrange
          var spiedFunction = socketSpy.emit;
          var firstArgument = spiedFunction.calls.allArgs()[0][0];
          var secondArgument = spiedFunction.calls.allArgs()[0][1];

          // Assert an init message is sent with organizations and 2 beacons, both with a response each
          expect(firstArgument).toBe('init');
          expect(secondArgument.allOrganizations.length).toBeGreaterThan(1);
          expect(secondArgument.currentOrganization.id).toBeDefined();
          expect(secondArgument.beacons[0].responses.length).toBe(1);
          expect(secondArgument.beacons[1].responses.length).toBe(1);
        });
      });
    });
  });
});
