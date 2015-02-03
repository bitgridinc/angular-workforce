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
      .withLocation(44.248961, -74.485675)
      .withResponse(factories.newAssistanceResponseFactory()
        .withIds('2cf8faaa-5760-41c9-adbf-5a4482ac3469', '7cf52dba-992e-4f3f-bbb7-36f4b1792e69', 117)
        .withResponderCrew(4, new Date())
        .createAssistanceResponse())
      .createBeacon(),
    factories.newBeaconFactory()
      .withIds(1337, '7cf52dba-992e-4f3f-bbb7-36f4b1792e69') // Silver Springs
      .withSummaryText('Their Title', 'Their Description')
      .withLocation(42.658379, -78.081735)
      .createBeacon()
  ]
};