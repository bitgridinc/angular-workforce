"use strict";

describe('the module that manages collapsing child controls', function() {
  var module;
  beforeEach(function() {
    module = angular.module('modules.cascadingCollapse');
  });

  it('should be registered with Angular', function() {
    expect(module).toBeDefined();
  });
});