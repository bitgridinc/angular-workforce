"use strict";

var factories = require('../shared/factories');

module.exports = {
  entities: [
    {
      name: 'Tupper Lake',
      id: '55a2726e-43ff-4ea9-8d3e-b7c439ef0e84',
      center: {
        lat: 44.222908,
        lng: -74.466358,
        zoom: 15
      }
    },
    {
      name: 'Solvay',
      id: '7cf52dba-992e-4f3f-bbb7-36f4b1792e69',
      center: {
        lat: 43.061184,
        lng: -76.212784,
        zoom: 15
      }
    },
    {
      name: 'Richmondville',
      id: 'c1d8d77c-b4d7-4007-a5ea-a0564c751f54',
      center: {
        lat: 42.634715,
        lng: -74.562904,
        zoom: 15
      }
    },
    {
      name: 'Philadelphia',
      id: '92f2e499-be81-4f48-b573-5e021250028f',
      center: {
        lat: 44.158101,
        lng: -75.707763,
        zoom: 15
      }
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
      .withIds(1337, '7cf52dba-992e-4f3f-bbb7-36f4b1792e69') // Solvay
      .withSummaryText('Their Title', 'Their Description')
      .withLocation(42.658379, -78.081735)
      .createBeacon()
  ]
};