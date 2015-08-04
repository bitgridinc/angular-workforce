"use strict";

var factories = require('../../../../shared/factories');

module.exports.messageDatabase = [
  factories.newAssistanceResponseFactory()
    .withIds('2cf8faaa-5760-41c9-adbf-5a4482ac3469', 'a9ZaRCDMCo0WWZO7', 1107)
    .withResponderCrew('0', new Date(2015, 1, 1, 1, 1, 1))
    .createAssistanceResponse()
];

module.exports.postResponse = {
  addResults: [
    {
      objectId:1107,
      globalId:null,
      success:true
    }
  ]
};

module.exports.queryGetResponse = {
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
        senderId: "yk7EooUDkOKQA9zj",
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
    }
  ]
};
