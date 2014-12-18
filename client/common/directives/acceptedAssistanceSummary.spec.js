"use strict";

describe('directive: summary of accepted assistance', function() {
  var scope,
      element,
      compiled,
      html,
      expected = {
        organization: {
          name: 'name'
        },
        numResponders: 18,
        arrivalDate: new Date()
      };

  beforeEach(function() {
    module('modules.directives');

    html = '<accepted-assistance-summary accepted-assistance="acceptedAssistance"></accepted-assistance-summary>';

    inject(function($rootScope, $compile) {
      scope = $rootScope.$new();

      element = angular.element(html);

      // I'm not happy about having to put this before I call $digest
      // given that $digest must be called before my assertions
      scope.acceptedAssistance = expected;

      // Compile the element into a function to process the view
      compiled = $compile(element);

      // Run the compiled view
      element = compiled(scope);

      scope.$digest();
    })
  });

  it('should contain the name of the responder', function() {
    expect(element.text()).toContain(expected.organization.name);
  });
  it('should contain the number of responders', function() {
    expect(element.text()).toContain(expected.numResponders);
  });
  it('should contain a year', function() {
    expect(element.text()).toContain(expected.arrivalDate.getFullYear());
  });
});