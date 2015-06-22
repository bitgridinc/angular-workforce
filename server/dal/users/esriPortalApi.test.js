"use strict";

var users = {
  total: 4,
  start: 1,
  num: 10,
  nextStart: -1,
  users: [
    {
      username: "chairfield",
      fullName: "Chris Hairfield",
      firstName: "Chris",
      lastName: "Hairfield",
      preferredView: null,
      description: null,
      email: "chris@bitgrid.co",
      userType: "both",
      idpUsername: null,
      favGroupId: "c2ed6e2c8b0d4ec989b208e07882657a",
      lastLogin: 1432831039000,
      mfaEnabled: false,
      validateUserProfile: true,
      access: "org",
      storageUsage: 45567,
      storageQuota: 2147483648,
      orgId: "yk7EooUDkOKQA9zj",
      role: "org_admin",
      disabled: false,
      tags: [ ],
      culture: null,
      region: null,
      units: null,
      thumbnail: null,
      created: 1424799870000,
      modified: 1426115928000,
      groups: [ ]
    },
    {
      username: "charlestaylorR",
      fullName: "Charles Taylor",
      firstName: "Charles",
      lastName: "Taylor",
      preferredView: null,
      description: null,
      email: "Charlie@bitgrid.co",
      userType: "arcgisonly",
      idpUsername: null,
      favGroupId: "10074666e9ef44e5bf1a8b5e99c3afb7",
      lastLogin: 1429896631000,
      mfaEnabled: false,
      validateUserProfile: true,
      access: "org",
      storageUsage: 0,
      storageQuota: 2147483648,
      orgId: "yk7EooUDkOKQA9zj",
      role: "org_admin",
      disabled: false,
      tags: [ ],
      culture: null,
      region: null,
      units: null,
      thumbnail: null,
      created: 1429133690000,
      modified: 1429133710000,
      groups: [ ]
    },
    {
      username: "justinhyde4",
      fullName: "Justin Hyde",
      firstName: "Justin",
      lastName: "Hyde",
      preferredView: null,
      description: null,
      email: "justin@bitgrid.co",
      userType: "both",
      idpUsername: null,
      favGroupId: "a31d1eb248fc4e1ea380265d00792cea",
      lastLogin: 1429136438000,
      mfaEnabled: false,
      validateUserProfile: true,
      access: "org",
      storageUsage: 373384,
      storageQuota: 2147483648,
      orgId: "yk7EooUDkOKQA9zj",
      role: "org_admin",
      disabled: false,
      tags: [ ],
      culture: null,
      region: null,
      units: null,
      thumbnail: null,
      created: 1426098043000,
      modified: 1426115956000,
      groups: [ ]
    },
    {
      username: "sahllt",
      fullName: "Sahil Talwar",
      firstName: "Sahil",
      lastName: "Talwar",
      preferredView: null,
      description: null,
      email: "sahiltalwar88@gmail.com",
      userType: "arcgisonly",
      idpUsername: null,
      favGroupId: "8680ef323b594b319d8ac69705908216",
      lastLogin: 1429663998000,
      mfaEnabled: false,
      validateUserProfile: true,
      access: "org",
      storageUsage: 0,
      storageQuota: 2147483648,
      orgId: "yk7EooUDkOKQA9zj",
      role: "org_admin",
      disabled: false,
      tags: [ ],
      culture: null,
      region: null,
      units: null,
      thumbnail: null,
      created: 1429133690000,
      modified: 1429663936000,
      groups: [ ]
    }
  ]
};

// Stubbed Esri portal API when running in test mode
module.exports = {
  portal: {
    users: function(accessToken, param) {
      return {
        then: function(callback) {
          callback(users);
        }
      };
    }
  }
};
