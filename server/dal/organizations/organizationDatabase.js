"use strict";

var data = require('./organizationDatabase.backingData.js')
  , environment = require('../../environment.js')
  , _ = require('lodash');

module.exports = {
  getAllOrganizations: function() {
    return data.organizations;
  },
  getCurrentOrganization: function(organizationId) {
    if (environment.runningInTestMode()) {
      return data.organizations[1];
    }

    return _.find(data.organizations, function(organization) {
      return organization.id === organizationId;
    });
  }
};
