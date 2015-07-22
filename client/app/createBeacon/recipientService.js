"use strict";

/// This service watches the allOrganization array and creates an array of organization
/// ViewModels, each with an include boolean property which is bound to a checkbox.
var RecipientService = function($rootScope, _) {
  var service = {
    possibleRecipients: [],
    getIncludedRecipientIds: function() {
      return _.chain(service.possibleRecipients)
        .where({ include: true })
        .map(function(r) {
          return r.organization.id
        })
        .value();
    }
  };

  // Note that a filter *might* be better as we grow as it would be reusable.
  // TODO: Test adding allOrganizations after the watch is set
  $rootScope.$watchCollection('dataFromServer.allOrganizations', function(newOrganizations) {
    service.possibleRecipients.length = 0;
    _.forEach(newOrganizations, function(organization) {
      if (organization.id !== $rootScope.dataFromServer.currentOrganization.id) {
        service.possibleRecipients.push({
          include: true,
          organization: organization
        });
      }
    });
  });

  return service;
};

RecipientService.$inject = ['$rootScope', '_'];

require('./_module').service('RecipientService', RecipientService);