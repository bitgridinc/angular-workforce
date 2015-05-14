"use strict";

var http = require('http')
  , request = require('request')
  , factories = require('../../shared/factories')
  , proxyquire = require('proxyquire')
  , esriResponses = require('./api.spec.esriResponses')
  , _ = require('lodash');

function hapifyRequest(payload) {
  return {
    payload: payload
  }
}

describe('the public API', function() {
  if (!process.env.aat) {
    var requestSpyObj
      , postFormSpy;

    beforeAll(function() { // Spy on the beacon database
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
    });

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
      });
      beforeEach(function() {
        // Arrange a request to the API to create a new beacon
        newBeaconPost =
          factories.newBeaconPostFactory()
            .withSenderId('7a95759f-3df8-4f16-bb43-24f4329fe3df')
            .withSummaryText('title', 'description')
            .withLocation(1, 2)
            .withRecipientIds(['b6038693-725d-4651-9a75-78fc202b1308', '9bf2989a-e6c9-48bd-b0b8-f20194fda10f'])
            .createBeaconPost();
        expectedRecipients = newBeaconPost.recipientIds.slice();
        expectedRecipients.push(newBeaconPost.senderId);

        // Act by calling the handler directly
        handlers.createBeacon.handler(hapifyRequest(newBeaconPost), function() {});
      });
      afterEach(function() {
        toSpy.calls.reset();
        emitSpy.calls.reset();
      });

      it('should address each recipient (+sender) over socket.io', function() {
        // Arrange variables
        var allArgs = _.map(toSpy.calls.allArgs(), function(call) {
          return call[0];
        });

        // Assert each recipient is addressed over socket.io
        expect(_.uniq(allArgs).length).toEqual(3);
        expectedRecipients.forEach(function(expectedRecipient) {
          expect(allArgs).toContain(expectedRecipient);
        });
      });
      it('should pass a newBeacon message with a beacon parameter to each recipient (+sender) over socket.io', function() {
        // Arrange variables
        var allArgs = emitSpy.calls.allArgs();

        // Assert each recipient is addressed over socket.io
        expect(allArgs.length).toEqual(expectedRecipients.length);
        allArgs.forEach(function(args) {
          expect(args[0]).toEqual('newBeacon');
          expect(args[1].senderId).toEqual(newBeaconPost.senderId);
        });
      });
      it('should have called request.post', function() {
        expect(requestSpyObj.post.calls.count()).toBeGreaterThan(0);
      });
      it('should have POSTed stuff as form parameters', function() {
        expect(postFormSpy.calls.count()).toBeGreaterThan(0);
      });
    });
  }
});

// TODO: Test recipients
/*describe('the create beacon API method', function() {
  it('should be able to send a new beacon back to the client', function(done) {
    // Arrange
    var messageCalled = false;
    // TODO: Must be able to specify who you are
    Client().on('newBeacon', function(data) {
      messageCalled = true;
      expect(data.id).toBeDefined();
      expect(data.senderId).toBeDefined();
      done();
    });

    // Act
    request.post(
      {
        uri: constants.serverUrl + apiRoutes.createBeacon,
        body: JSON.stringify(factories.newBeaconPostFactory()
          .withSenderId('7a95759f-3df8-4f16-bb43-24f4329fe3df')
          .withSummaryText('title', 'description')
          .withLocation(1, 2)
          .withRecipientId('7a95759f-3df8-4f16-bb43-24f4329fe3df')
          .createBeaconPost()
        )
      }
    );

    // Assert
    waitsForAndRuns(
      function() { return messageCalled === true; },
      function() { expect(messageCalled).toBe(true); },
      1000);
  });
});

describe('the offer assistance API method', function() {
  it('should send the offer to all connected clients', function(done) {
    // Arrange
    var messageCalled = false;
    Client().on('assistanceResponse', function(data) {
      messageCalled = true;
      expect(data.id).toBeDefined();
      expect(data.numResponders).toBeDefined();
      expect(data.arrivalDate).toBeDefined();
      expect(data.senderId).toBeDefined();
      expect(data.beaconId).toBeDefined();
      done();
    });

    // Act
    request.post(
      {
        uri: constants.serverUrl + apiRoutes.offerAssistance,
        body: JSON.stringify({
          contents: {
            numResponders: 1,
            arrivalDate: new Date()
          },
          senderId: '7a95759f-3df8-4f16-bb43-24f4329fe3df',
          beaconId: 117
        })
      }
    );

    // Assert
    waitsForAndRuns(
      function() { return messageCalled === true; },
      function() { expect(messageCalled).toBe(true); },
      1000);
  });
});*/
