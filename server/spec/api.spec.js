"use strict";

var http = require('http')
  , request = require('request')
  , factories = require('../../shared/factories')
  , proxyquire = require('proxyquire')
  , esriResponses = require('./api.spec.esriResponses')
  , environment = require('../environment')
  , _ = require('lodash');

function hapifyRequest(payload) {
  return {
    payload: payload
  }
}

describe('the public API', function() {
  var geoservicesModuleFunction
    , geoservicesSpyObj
    , mode;

  beforeAll(function() {
    geoservicesSpyObj = jasmine.createSpyObj('geoservices', ['featureservice']);
    geoservicesSpyObj.featureservice.and.callFake(function(options, callback) {
      console.log('GHY: We got to the fake', options, callback);
      callback();
    });

    // Create a spy for the geoservices.featureservice.prototype.add function, used to create beacons
    var addSpy = jasmine.createSpy('add');
    addSpy.and.callFake(function(params, callback) {
      console.log('addSpy called, calling callback', params);
      callback(undefined, esriResponses.postResponse);
    });
    geoservicesSpyObj.featureservice.prototype.add = addSpy;

    // Create a spy for the geoservices.featureservice.prototype.query function, used to get beacons
    var querySpy = jasmine.createSpy('query');
    querySpy.and.callFake(function(params, callback) {
      console.log('querySpy called, calling callback', params);
      callback(undefined, esriResponses.queryGetResponse);
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
  }); // Spy on the geoservices module, which we use in featureServer.js to communicate with Esri
  beforeEach(function() {
    mode = environment.getCurrentMode();
    environment.changeToProductionMode();
  }); // Ensure each test runs in production mode
  afterEach(function() {
    environment.changeToMode(mode);
  }); // Reset back to whatever the mode was before the test was run

  describe('create beacon method', function() {
    var handlers
      , toSpy
      , emitSpy
      , newBeaconPost
      , expectedRecipients;

    beforeAll(function() {
      // We don't want to send socket.io messages, so create a spy for the 'to' and 'emit' functions
      toSpy = jasmine.createSpy('to');
      emitSpy = jasmine.createSpy('emit');
      var socketIoSpy = {
        to : toSpy.and.returnValue({
          emit: emitSpy
        })
      };

      // We must create the spies before we require in the api, as it is in the api's require statements that the
      // code in which we are spying is used
      handlers = proxyquire('../api', {
        'geoservices': geoservicesModuleFunction
      })(socketIoSpy);
    }); // Set up our spies
    beforeEach(function() {
      // Arrange a request to the API to create a new beacon
      newBeaconPost =
        factories.newBeaconPostFactory()
          .withSenderId('7a95759f-3df8-4f16-bb43-24f4329fe3df')
          .withSummaryText('Murfreesboro Title', 'Murfreesboro Description')
          .withNumberOfPeople('4')
          .withLocation(1, 2)
          .withRecipientIds(['b6038693-725d-4651-9a75-78fc202b1308', '9bf2989a-e6c9-48bd-b0b8-f20194fda10f'])
          .createBeaconPost();
      expectedRecipients = newBeaconPost.recipientIds.slice();
      expectedRecipients.push(newBeaconPost.senderId);

      // Act by calling the handler directly
      handlers.createBeacon.handler(hapifyRequest(newBeaconPost), function() {});
    }); // Call createBeacon with a new beacon POST
    afterEach(function() {
      toSpy.calls.reset();
      emitSpy.calls.reset();
      geoservicesSpyObj.featureservice.calls.reset();
      geoservicesSpyObj.featureservice.prototype.add.calls.reset();
      geoservicesSpyObj.featureservice.prototype.query.calls.reset();
    }); // Reset the spies

    describe('the socket.io to function, used to address the recipient,', function() {
      var toArgs;
      beforeEach(function() {
        toArgs = _.map(toSpy.calls.allArgs(), function(call) {
          return call[0];
        });
      }); // Set toArgs from toSpy
      it('should have been called 3 times', function() {
        expect(_.uniq(toArgs).length).toEqual(3);
      });
      it('should have been passed each beacon recipient and the sender', function() {
        expectedRecipients.forEach(function(expectedRecipient) {
          expect(toArgs).toContain(expectedRecipient);
        });
      });
    });
    describe('the socket.io emit function, chained off the to function,', function() {
      var emitArgs;
      beforeEach(function() {
        emitArgs = emitSpy.calls.allArgs();
      }); // Set emitArgs from emitSpy
      it('should have been called 3 times', function() {
        expect(emitArgs.length).toEqual(3);
      });
      it('should have always been passed the same newBeacon message', function() {
        emitArgs.forEach(function(args) {
          expect(args[0]).toEqual('newBeacon');

          // Assert the basic beacon properties
          expect(args[1].lng).toBe(newBeaconPost.lng);
          expect(args[1].lat).toBe(newBeaconPost.lat);
          expect(args[1].senderId).toEqual(newBeaconPost.senderId);
          expect(args[1].title).toEqual(newBeaconPost.title);
        });
      });
    });
    describe('Esri\'s geoservices module, used to GET/POSt to Esri\'s ArcGIS Online,', function() {
      describe('the FeatureService.prototype.add method', function() {
        it('should have been called once', function() {
          expect(geoservicesSpyObj.featureservice.prototype.add.calls.count()).toBe(1);
        });
        describe('the passed in feature', function() {
          it('should contain the same properties as was POSTed to our server', function() {
            var feature = geoservicesSpyObj.featureservice.prototype.add.calls.allArgs()[0][0].features[0];

            // Assert the basic feature properties
            expect(feature.geometry.x).toBe(newBeaconPost.lng);
            expect(feature.geometry.y).toBe(newBeaconPost.lat);
            expect(feature.attributes.senderId).toEqual(newBeaconPost.senderId);
            expect(feature.attributes.title).toEqual(newBeaconPost.title);
            expect(feature.attributes.numberOfPeople).toEqual(newBeaconPost.numberOfPeople);
          });
        });
      });
    });
  });
});
