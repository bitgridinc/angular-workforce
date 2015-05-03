"use strict";

var factories = require('../../../shared/factories');

module.exports = {
  beacons: [
    factories.newBeaconFactory()
      .withIds(30, '7a95759f-3df8-4f16-bb43-24f4329fe3df')
      .withSummaryText('Murfreesboro Title', 'Murfreesboro Description')
      .withLocation(0, 0)
      .withAddress('1563 N Thompson Ln')
      .withNumberOfPeople('4')
      .createBeacon()
  ]
};