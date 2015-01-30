"use strict";

var factories = require('../shared/factories');

module.exports = {
  entities: [
    {
      name: 'Tupper Lake',
      id: '55a2726e-43ff-4ea9-8d3e-b7c439ef0e84'
    },
    {
      name: 'Silver Springs',
      id: '7cf52dba-992e-4f3f-bbb7-36f4b1792e69'
    },
    {
      name: 'Bergen',
      id: 'c1d8d77c-b4d7-4007-a5ea-a0564c751f54'
    }
  ],
  beacons: [
    factories.newBeaconFactory()
      .withIds(117, '55a2726e-43ff-4ea9-8d3e-b7c439ef0e84') // Tupper Lake
      .withSummaryText('Your Title', 'Your Description')
      .withLocation(38.9, -77.0)
      .withResponse(factories.newAssistanceResponseFactory()
        .withId('2cf8faaa-5760-41c9-adbf-5a4482ac3469')
        .withSenderId('7cf52dba-992e-4f3f-bbb7-36f4b1792e69')
        .withBeaconId(117)
        .withResponderCrew(4, new Date())
        .createAssistanceResponse())
      .createBeacon(),
    factories.newBeaconFactory()
      .withIds(1337, '7cf52dba-992e-4f3f-bbb7-36f4b1792e69') // Silver Springs
      .withSummaryText('Their Title', 'Their Description')
      .withLocation(38.88, -77.02)
      .createBeacon()
  ]
};