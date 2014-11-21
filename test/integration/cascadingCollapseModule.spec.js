"use strict";

describe('the cascading collapse module', function() {
  var module;
  beforeEach(function() {
    module = angular.module('modules.cascadingCollapse');
  });

  it('should be registered', function() {
    expect(module).toBeDefined();
  });
});