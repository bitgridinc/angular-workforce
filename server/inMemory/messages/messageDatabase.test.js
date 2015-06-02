"use strict";

var factories = require('../../../shared/factories');

var messages = [
  factories.newAssistanceResponseFactory()
    .withIds('2cf8faaa-5760-41c9-adbf-5a4482ac3469', '323f8a60-37c6-4d97-a2f8-331c2231e92b', 30)
    .withResponderCrew('4', new Date(2015, 1, 1, 1, 1, 1))
    .createAssistanceResponse(),
  factories.newAssistanceResponseFactory()
    .withIds('eb6cd1ad-d115-49de-aac0-cfbb887d9ad0', '7a95759f-3df8-4f16-bb43-24f4329fe3df', 32)
    .withResponderCrew('2', new Date(2015, 1, 1, 1, 1, 1))
    .createAssistanceResponse(),
  factories.newAssistanceResponseFactory()
    .withIds('8fddf254-2fb3-4f1e-826b-2db90cdfc9b0', '0be19f21-40ca-47b1-9a07-9c9657fe27b5', 32)
    .withResponderCrew('4 and a truck', new Date(2015, 1, 1, 1, 1, 1))
    .createAssistanceResponse(),
  factories.newAssistanceResponseFactory()
    .withIds('c8ce9a09-ea5c-457b-9f30-528ba19594aa', '323f8a60-37c6-4d97-a2f8-331c2231e92b', 34)
    .withResponderCrew('3', new Date(2015, 1, 1, 1, 1, 1))
    .createAssistanceResponse()
];

// I expect there will be an indexed accepted column in the messages table. I'm using the assistanceResponseFactory
// because I'm lazy, but I can't add the accepted column to the factory because it doesn't belong in the domain; I
// prefer having messages in two separate arrays (responses and acceptedAssistance) on the beacon in the domain.
messages[0].accepted = false;
messages[1].accepted = false;
messages[2].accepted = false;
messages[3].accepted = true;

module.exports = messages;
