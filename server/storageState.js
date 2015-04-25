"use strict";

var factories = require('../shared/factories');

module.exports = {
  entities: [
    {
      name: 'Murfreesboro Electric Department',
      id: '7a95759f-3df8-4f16-bb43-24f4329fe3df',
      center: {
        lat: 35.847379,
        lng: -86.393580,
        zoom: 15
      },
      contact: {
        name: 'Charlie',
        phone: '615-893-5514'
      }
    },
    {
      name: 'Morristown Utility Systems',
      id: '323f8a60-37c6-4d97-a2f8-331c2231e92b',
      center: {
        lat: 36.195129,
        lng: -83.309222,
        zoom: 15
      },
      contact: {
        name: 'Chris',
        phone: '423-585-6700'
      }
    },
    {
      name: 'Greeneville Light & Power System',
      id: '83a33674-be04-4c93-81a3-71a9ca0ce339',
      center: {
        lat: 36.162546,
        lng: -82.829386,
        zoom: 15
      },
      contact: {
        name: 'Justin',
        phone: '423-636-6200'
      }
    },
    {
      name: 'Memphis Light, Gas and Water',
      id: '0be19f21-40ca-47b1-9a07-9c9657fe27b5',
      center: {
        lat: 35.139590,
        lng: -90.055134,
        zoom: 15
      },
      contact: {
        name: 'Sahil',
        phone: '901-544-6500'
      }
    }
  ],
  beacons: [
    factories.newBeaconFactory()
      .withIds(117, '7a95759f-3df8-4f16-bb43-24f4329fe3df') // Murfreesboro
      .withSummaryText('Murfreesboro Title', 'Murfreesboro Description')
      .withLocation(35.891781, -86.423536)
      .withAddress('1563 N Thompson Ln')
      .withNumberOfPeople('4-6')
      .withResponse(factories.newAssistanceResponseFactory()
        .withIds('2cf8faaa-5760-41c9-adbf-5a4482ac3469', '323f8a60-37c6-4d97-a2f8-331c2231e92b', 117)
        .withResponderCrew(4, new Date())
        .createAssistanceResponse())
      .createBeacon(),
    factories.newBeaconFactory()
      .withIds(1337, '323f8a60-37c6-4d97-a2f8-331c2231e92b') // Morristown
      .withSummaryText('Morristown Title', 'Morristown Description')
      .withLocation(42.658379, -78.081735)
      .withAddress('1100 Woods Road')
      .withNumberOfPeople('~8')
      .createBeacon()
  ]
};