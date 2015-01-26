"use strict";

var http = require('http'),
    request = require('request');

var serverURL = 'http://0.0.0.0:8080';

describe('the create beacon API method', function() {
  it('should exist', function() {
    request.post(
      {
        uri: serverURL + '/beacon',
        body: JSON.stringify({
          contents: {
            title: 'title',
            description: 'description',
            lat: 1,
            lng: 2
          },
          senderId: '55a2726e-43ff-4ea9-8d3e-b7c439ef0e84'
        })
      },
      function(error, response, body) {
        expect(error).toBeNull();
        var bodyObj = JSON.parse(body);
        expect(bodyObj.responses).toEqual([]);
        expect(bodyObj.acceptedAssistance).toEqual([]);
      }
    );

    // This should also send a socket-io message
  });
});
