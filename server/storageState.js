"use strict";

module.exports = {
  entities: [
    {
      name: 'Your Organization',
      id: '55a2726e-43ff-4ea9-8d3e-b7c439ef0e84'
    },
    {
      name: 'Their Organization',
      id: '7cf52dba-992e-4f3f-bbb7-36f4b1792e69'
    },
    {
      name: 'Third Organization',
      id: 'c1d8d77c-b4d7-4007-a5ea-a0564c751f54'
    }
  ],
  beacons: [
    {
      id: 117,
      title: 'Your Title',
      description: 'Your Description',
      lat: 38.9,
      lng: -77.0,
      responses: [{
        id: '2cf8faaa-5760-41c9-adbf-5a4482ac3469',
        senderId: '7cf52dba-992e-4f3f-bbb7-36f4b1792e69',
        numResponders: 4,
        arrivalDate: new Date()
      }],
      acceptedAssistance: [],
      senderId: '55a2726e-43ff-4ea9-8d3e-b7c439ef0e84' // Your Organization
    },
    {
      id: 1337,
      title: 'Their Title',
      description: 'Their Description',
      lat: 38.88,
      lng: -77.02,
      responses: [],
      acceptedAssistance: [],
      senderId: '7cf52dba-992e-4f3f-bbb7-36f4b1792e69' // Their Organization
    }
  ]
};