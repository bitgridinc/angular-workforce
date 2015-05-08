"use strict";

var factories = require('../../../shared/factories');

module.exports = [
  factories.newAssistanceResponseFactory()
           .withIds('2cf8faaa-5760-41c9-adbf-5a4482ac3469', '323f8a60-37c6-4d97-a2f8-331c2231e92b', 30)
           .withResponderCrew('4', new Date(2015, 1, 1, 1, 1, 1))
           .createAssistanceResponse(),
  factories.newAssistanceResponseFactory()
           .withIds('eb6cd1ad-d115-49de-aac0-cfbb887d9ad0', '7a95759f-3df8-4f16-bb43-24f4329fe3df', 32)
           .withResponderCrew('2', new Date(2015, 1, 1, 1, 1, 1))
           .createAssistanceResponse()
];
