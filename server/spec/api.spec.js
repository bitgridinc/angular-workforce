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
  var requestSpyObj
    , postFormSpy
    , mode;

  beforeAll(function() {
    requestSpyObj = jasmine.createSpyObj('request', ['get', 'post']);

    // Apparently, I should never do this: https://www.npmjs.com/package/proxyquire#caveat
    requestSpyObj['@global'] = true;

    postFormSpy = jasmine.createSpy('form');
    requestSpyObj.get.and.callFake(function(url, callback) {
      callback(null, undefined, url.indexOf('query') > -1 ? esriResponses.queryGetResponse : esriResponses.layerGetRespone);
    });
    requestSpyObj.post.and.callFake(function(ignored, callback) {
      callback(null, undefined, esriResponses.postResponse);
      return {
        form: postFormSpy
      };
    });
  }); // Spy on the beacon database
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

      // We must create the spies before we require in the api, as it is in the api's require statements that the
      // code in which we are spying is used
      handlers = proxyquire('../api', {
        'request' : requestSpyObj,
        './socketSetup': {
          instance: {
            to : toSpy.and.returnValue({
              emit: emitSpy
            })
          }
        }
      });
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
      requestSpyObj.get.calls.reset();
      requestSpyObj.post.calls.reset();
      postFormSpy.calls.reset();
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
    // TODO: 'Esri's geoservices module, used to GET/POSt to Esri's ArcGIS Online, '
    describe('the underlying request module, which is used to GET/POST to Esri\'s ArcGIS Online,', function() {
      // TODO: describe('the FeatureService.prototype.add method')
      // TODO:   it('should have been called once'
      it('should have been POSTed to once to create the beacon', function() {
        expect(requestSpyObj.post.calls.count()).toBe(1);
        expect(postFormSpy.calls.count()).toBe(1);
      });
      // TODO:   describe('the feature passed to the geoservices API'
      describe('the POSTed features property', function() {
        // TODO:   it('should contain the same properties as was POSTed to our server'
        it('should have our beacon as the value', function() {
          var feature = JSON.parse(postFormSpy.calls.allArgs()[0][0].features)[0];

          // Assert the basic feature properties
          expect(feature.geometry.x).toBe(newBeaconPost.lng);
          expect(feature.geometry.y).toBe(newBeaconPost.lat);
          expect(feature.attributes.senderId).toEqual(newBeaconPost.senderId);
          expect(feature.attributes.title).toEqual(newBeaconPost.title);
        });
      });
    });
  });
});
