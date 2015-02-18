"use strict";

/*('the pagination control state factory', function() {
  var factory,
      scope;

  beforeEach(module('modules.providers'));
  beforeEach(inject(function ($rootScope, _PaginationControl_) {
    scope = $rootScope.$new();
    factory = _PaginationControl_;
  }));

  describe('has an initialization method that', function () {
    it ('should barf on an invalid $scope', function () {
      expect(function() { factory.initScope(undefined, []) }).toThrowError();
      expect(function() { factory.initScope(null, []) }).toThrowError();
    });
    it ('should barf on an empty items array (i.e., nothing to paginate on)', function () {
      expect(function() { factory.initScope({}, []) }).toThrowError();
    });

    describe('when fed a two-item list', function () {
      var firstItem = {},
          secondItem = {},
          items = [firstItem, secondItem];

      beforeEach(function () {
        factory.initScope(scope, items);
      });

      it ('should set a scope property with the length of 2', function () {
        expect(scope.totalItems).toBe(2);
      });
      it ('should set a scope property pointing to the first item', function () {
        expect(scope.currentItem).toBe(firstItem);
      });
      it ('should update the scope when the page is changed', function () {
        scope.changePage(2);
        expect(scope.currentItem).toBe(secondItem);
      })
    });
  });
});*/
