"use strict";

var data = require('./organizationDatabase.backingData.js')
  , environment = require('../../environment.js')
  , next = 0;

module.exports = {
  getAllOrganizations: function() {
    return data.organizations;
  },
  getCurrentOrganization: function() {
    if (environment.runningInTestMode()) {
      return data.organizations[1];
    }

    if (next >= data.organizations.length) {
      next = 0;
    }

    return data.organizations[next++];
  }
};
