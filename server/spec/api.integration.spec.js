"use strict";

var http = require('http')
  , request = require('request')
  , factories = require('../../shared/factories')
  , proxyquire = require('proxyquire')
  , specData = require('./api.integration.specData.js')
  , spyHelpers = require('./support/spyHelpers')
  , environment = require('../environment')
  , _ = require('lodash');

function hapifyRequest(payload) {
  return {
    payload: payload
  }
}

describe('in production,', function() {
  var mode;
  beforeEach(function() {
    mode = environment.getCurrentMode();
    environment.changeToProductionMode();
  }); // Ensure each test runs in production mode
  afterEach(function() {
    environment.changeToMode(mode);
  }); // Reset back to whatever the mode was before the test was run

  describe('spying on dependencies (geoservices, esri-portal-api, socket.io)', function() {
    var geoservicesSpy;
    beforeEach(function() {
      geoservicesSpy = spyHelpers.createGeoservicesSpy({
        add: specData.postResponse,
        query: specData.queryGetResponse
      });
    }); // Spy on the geoservices module, which we use in featureServer.js to communicate with Esri

    var esriPortalModuleFunction;
    beforeEach(function() {
      var portalSpyObj = jasmine.createSpyObj('portal', ['users']);
      portalSpyObj.users.and.returnValue({
        then: function(callback) {
          return callback(specData.getAllUsersResponse);
        }
      });
      var esriPortalApiSpy = {
        portal: portalSpyObj
      };
      esriPortalModuleFunction = function() {
        return esriPortalApiSpy;
      };
    }); // Spy on the esri-portal-api module, which we use in userDatabase.js to communicate with Esri's portal API

    var sioServerSpy
      , emitSpy;
    beforeEach(function() {
      // We don't want to send socket.io messages, so create a spy for the 'to' and 'emit' functions
      emitSpy = jasmine.createSpy('emit');
      sioServerSpy = jasmine.createSpyObj('socketIoSpy', ['to']);
      sioServerSpy.sockets = jasmine.createSpyObj('sockets', ['emit']);
      sioServerSpy.to.and.returnValue({
        emit: emitSpy
      });
    }); // Spy on the socket.io module, which we use to push data to connected clients

    var handlers;
    beforeEach(function() {
      // Proxyquire recommends I don't do this, but it's required for an integration test. I'm proxying a require many
      // levels down, and proxyquire only goes one level deep by default (it's normally used for unit testing). See:
      // https://www.npmjs.com/package/proxyquire#caveat
      geoservicesSpy.moduleFunction['@global'] = true;
      esriPortalModuleFunction['@global'] = true;
      specData.messageDatabase['@global'] = true;

      // We must create the spies before we require in the api, as it is in the api's require statements that the
      // code in which we are spying is used
      handlers = proxyquire('../api', {
        'geoservices': geoservicesSpy.moduleFunction,
        'esri-portal-api': esriPortalModuleFunction,
        './messageDatabase.prod.js': specData.messageDatabase
      })(sioServerSpy);
    }); // Instantiate our api, the SUT, with the spies set up above

    describe('the offerAssistance API', function() {
      var postPayload;
      beforeEach(function() {
        postPayload = {
          contents: {
            numResponders: 1,
            arrivalDate: new Date()
          },
          senderId: '83a33674-be04-4c93-81a3-71a9ca0ce339',
          beaconId: 1107,
          recipientIds: undefined
        };
        handlers.offerAssistance.handler(hapifyRequest(postPayload), function() {});
      }); // POST to offerAssistance

      function verifyMessageAgainstPost(message) {
        expect(message.senderId).toBe(postPayload.senderId);
        expect(message.beaconId).toBe(postPayload.beaconId);
        expect(message.numResponders).toBe(postPayload.contents.numResponders);
      }

      describe('the messageDatabase', function() {
        it('should have a new message added', function() {
          expect(specData.messageDatabase.length).toBe(2);
        });
        describe('the new message', function() {
          it('should contain the properties that were POSTed', function() {
            // Arrange
            var newMessage = specData.messageDatabase[1];

            // Assert
            verifyMessageAgainstPost(newMessage);
          });
        });
      });
      describe('every connected socket.io client', function() {
        it('should only be called once', function() {
          expect(sioServerSpy.sockets.emit.calls.count()).toBe(1);
        });
        it('should be passed the offer of assistance', function() {
          // Arrange
          var args = sioServerSpy.sockets.emit.calls.allArgs()[0];

          // Assert
          expect(args[0]).toBe('assistanceResponse');
          verifyMessageAgainstPost(args[1]);
        });
      });
    });

    describe('the acceptAssistance API', function() {
      var postPayload;
      beforeEach(function() {
        postPayload = {
          contents: '2cf8faaa-5760-41c9-adbf-5a4482ac3469',
          senderId: '83a33674-be04-4c93-81a3-71a9ca0ce339',
          beaconId: 1107,
          recipientIds: undefined
        };
        handlers.acceptAssistance.handler(hapifyRequest(postPayload), function() {});
      }); // POST to acceptAssistance

      describe('the message in the messageDatabase', function() {
        it('should now be accepted', function() {
          expect(specData.messageDatabase[0].accepted).toBeTruthy();
        });
      });
      describe('every connected socket.io client', function() {
        it('should only be called once', function() {
          expect(sioServerSpy.sockets.emit.calls.count()).toBe(1);
        });
        it('should be passed a packet indicating the message was accepted', function() {
          // Arrange
          var args = sioServerSpy.sockets.emit.calls.allArgs()[0];

          // Assert
          expect(args[0]).toBe('acceptedAssistance');
          expect(args[1].beaconId).toBe(postPayload.beaconId);
          expect(args[1].responseId).toBe(postPayload.contents);
        });
      });
    });

    describe('the getAllUsers API', function() {
      it('should pass Esri users to the Hapi reply function', function() {
        // Arrange
        var replySpy = jasmine.createSpy('reply');

        // Act
        handlers.getAllUsers.handler(hapifyRequest(undefined), replySpy);

        // Assert
        expect(replySpy.calls.allArgs()[0][0].users.length).toBe(specData.getAllUsersResponse.users.length);
      });
    });

    describe('the createBeacon API', function() {
      var newBeaconPost
        , expectedRecipients;
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

      describe('the socket.io to function, used to address the recipient,', function() {
        var toArgs;
        beforeEach(function() {
          toArgs = _.map(sioServerSpy.to.calls.allArgs(), function(call) {
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
            expect(geoservicesSpy.moduleSpy.featureservice.prototype.add.calls.count()).toBe(1);
          });
          describe('the passed in feature', function() {
            it('should contain the same properties as was POSTed to our server', function() {
              var feature = geoservicesSpy.moduleSpy.featureservice.prototype.add.calls.allArgs()[0][0].features[0];

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
});
