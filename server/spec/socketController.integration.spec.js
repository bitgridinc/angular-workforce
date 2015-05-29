"use strict";

var http = require('http')
  , request = require('request')
  , factories = require('../../shared/factories')
  , proxyquire = require('proxyquire')
  , esriResponse = require('./socketController.esriResponse')
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
    var geoservicesModuleFunction
      , geoservicesSpyObj;
    beforeAll(function() {
      geoservicesSpyObj = jasmine.createSpyObj('geoservices', ['featureservice']);
      geoservicesSpyObj.featureservice.and.callFake(function(options, callback) {
        console.log('GHY: We got to the fake', options, callback);
        callback();
      });

      // Create a spy for the geoservices.featureservice.prototype.query function, used to get beacons
      var querySpy = jasmine.createSpy('query');
      querySpy.and.callFake(function(params, callback) {
        console.log('querySpy called, calling callback', params);
        callback(undefined, esriResponse);
      });
      geoservicesSpyObj.featureservice.prototype.query = querySpy;

      // When the geoservices module is newed up, return our spy object
      geoservicesModuleFunction = function() {
        return geoservicesSpyObj;
      };

      // Proxyquire recommends I don't do this, but it's required for an integration test. I'm proxying a require many
      // levels down, and proxyquire only goes one level deep by default (it's normally used for unit testing). See:
      // https://www.npmjs.com/package/proxyquire#caveat
      geoservicesModuleFunction['@global'] = true;
    }); // Stub the geoservices API with 2 beacons

    var socketIoSpy;
    beforeAll(function() {
      // Create a socket.io client spy
      var socketSpy = jasmine.createSpyObj('client', ['emit']);

      // We need to spy on the sockets.on function and call the callback to act as if the listener was hit
      var socketsSpyObj = jasmine.createSpyObj('sockets', ['on']);
      socketsSpyObj.sockets.on.and.callFake(function(name, callback) {
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

    var sut
      , testMessages = [
        factories.newAssistanceResponseFactory()
          .withIds('2cf8faaa-5760-41c9-adbf-5a4482ac3469', '323f8a60-37c6-4d97-a2f8-331c2231e92b', 1107)
          .withResponderCrew('4', new Date(2015, 1, 1, 1, 1, 1))
          .createAssistanceResponse(),
        factories.newAssistanceResponseFactory()
          .withIds('4568faaa-5760-41c9-adbf-5a4482ac3469', '789f8a60-37c6-4d97-a2f8-331c2231e92b', 1108)
          .withResponderCrew('6', new Date(2015, 1, 1, 1, 1, 1))
          .createAssistanceResponse()
      ];
    beforeAll(function() {
      // We must create the spies before we require in the api, as it is in the api's require statements that the
      // code in which we are spying is used
      sut = proxyquire('../socketController', {
        'geoservices': geoservicesModuleFunction,
        './messageDatabase.prod.js': testMessages
      })(socketIoSpy);
    }); // Proxyquire the SUT, passing in our stubbed geoservices module and 2 test messages, one for each beacon

    afterEach(function() {

    }); // Rest the socket.io spies

    describe('socket.io', function() {
      it('shall be set to listen for \'connection\' messages', function() {
        expect(socketIoSpy.sockets.on.calls.count()).toBe(4);
      });

      describe('after a client has connected', function() {
        it('shall be joined to a socket.io room by its organization id', function() {

        });
        it('shall be passed an init message containing organization and beacon information', function() {

        });
      });
    });
  });
});
