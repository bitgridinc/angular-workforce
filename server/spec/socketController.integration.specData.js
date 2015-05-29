"use strict";

var factories = require('../../shared/factories');

module.exports.messages = [
  factories.newAssistanceResponseFactory()
    .withIds('2cf8faaa-5760-41c9-adbf-5a4482ac3469', '323f8a60-37c6-4d97-a2f8-331c2231e92b', 1107)
    .withResponderCrew('4', new Date(2015, 1, 1, 1, 1, 1))
    .createAssistanceResponse(),
  factories.newAssistanceResponseFactory()
    .withIds('4568faaa-5760-41c9-adbf-5a4482ac3469', '789f8a60-37c6-4d97-a2f8-331c2231e92b', 1108)
    .withResponderCrew('6', new Date(2015, 1, 1, 1, 1, 1))
    .createAssistanceResponse()
];

module.exports.esriGetFeaturesResponse = {
  objectIdFieldName: "ObjectId",
  globalIdFieldName: "",
  geometryType: "esriGeometryPoint",
  spatialReference: {
    wkid: 4326,
    latestWkid: 4326
  },
  fields: [
    {
      name: "senderId",
      type: "esriFieldTypeString",
      alias: "senderId",
      sqlType: "sqlTypeNVarchar",
      length: 256,
      domain: null,
      defaultValue: null
    },
    {
      name: "title",
      type: "esriFieldTypeString",
      alias: "title",
      sqlType: "sqlTypeNVarchar",
      length: 256,
      domain: null,
      defaultValue: null
    },
    {
      name: "description",
      type: "esriFieldTypeString",
      alias: "description",
      sqlType: "sqlTypeNVarchar",
      length: 256,
      domain: null,
      defaultValue: null
    },
    {
      name: "streetAddress",
      type: "esriFieldTypeString",
      alias: "streetAddress",
      sqlType: "sqlTypeNVarchar",
      length: 256,
      domain: null,
      defaultValue: null
    },
    {
      name: "numberOfPeople",
      type: "esriFieldTypeString",
      alias: "numberOfPeople",
      sqlType: "sqlTypeNVarchar",
      length: 256,
      domain: null,
      defaultValue: null
    },
    {
      name: "ObjectId",
      type: "esriFieldTypeInteger",
      alias: "ObjectId",
      sqlType: "sqlTypeInteger",
      domain: null,
      defaultValue: null
    }
  ],
  features: [
    {
      attributes: {
        senderId: "7a95759f-3df8-4f16-bb43-24f4329fe3de",
        title: "Murfreesboro Title",
        description: "Murfreesboro Description",
        streetAddress: "1563 N Thompson Ln",
        numberOfPeople: "4",
        ObjectId: 1107
      },
      geometry: {
        x: 2,
        y: 1
      }
    },
    {
      attributes: {
        senderId: "8a95759f-3df8-4f16-bb43-24f4329fe3df",
        title: "2Murfreesboro Title2",
        description: "2Murfreesboro Description2",
        streetAddress: "21563 N Thompson Ln2",
        numberOfPeople: "242",
        ObjectId: 1108
      },
      geometry: {
        x: 3,
        y: 2
      }
    }
  ]
};
