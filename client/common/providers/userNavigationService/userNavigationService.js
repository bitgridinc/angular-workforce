"use strict";

require('./../_module_init.js')
  .service('UserNavigationService',
    [         '$state',
      function($state) {
        return {
          go: function(to, /**Object=*/params) {
            console.log('Transitioning to state: ', to, params);
            $state.go(to, params);
          },
          /**
           * @ngdoc function
           * @name UserNavigationService#doesUserNavigationStateInclude
           * @methodOf UserNavigationService
           *
           * @description
           * A wrapper of ui.router.state.$state#includes used to determine if the current active
           * state is equal to or is the child of the state stateName. If any params are passed then
           * they will be tested for a match as well. Not all the parameters need to be passed, just
           * the ones you'd like to test for equality.
           *
           * @example
           * Partial and relative names
           * <pre>
           * $state.$current.name = 'contacts.details.item';
           *
           * // Using partial names
           * $state.includes("contacts"); // returns true
           * $state.includes("contacts.details"); // returns true
           * $state.includes("contacts.details.item"); // returns true
           * $state.includes("contacts.list"); // returns false
           * $state.includes("about"); // returns false
           *
           * // Using relative names (. and ^), typically from a template
           * // E.g. from the 'contacts.details' template
           * <div ng-class="{highlighted: $state.includes('.item')}">Item</div>
           * </pre>
           *
           * Basic globbing patterns
           * <pre>
           * $state.$current.name = 'contacts.details.item.url';
           *
           * $state.includes("*.details.*.*"); // returns true
           * $state.includes("*.details.**"); // returns true
           * $state.includes("**.item.**"); // returns true
           * $state.includes("*.details.item.url"); // returns true
           * $state.includes("*.details.*.url"); // returns true
           * $state.includes("*.details.*"); // returns false
           * $state.includes("item.**"); // returns false
           * </pre>
           *
           * @param {string} stateOrName A partial name, relative name, or glob pattern
           * to be searched for within the current state name.
           * @param {object=} params A param object, e.g. `{sectionId: section.id}`,
           * that you'd like to test against the current active state.
           * @param {object=} options An options object.  The options are:
           *
           * - **`relative`** - {string|object=} -  If `stateOrName` is a relative state reference and `options.relative` is set,
           * .includes will test relative to `options.relative` state (or name).
           *
           * @returns {boolean} Returns true if it does include the state
           */
          doesUserNavigationStateInclude : function(stateOrName, params, options) {
            return $state.includes(stateOrName, params, options);
          }
        };
      }
    ]
  )
  .service('state',
  [         '$state',
    function($state) {
      console.log('HERE HERE');
      return {
        go: function(to, /**Object=*/params) {
          console.log('WHOA: Transitioning to state: ', to, params);
        }
      };
    }
  ]
);
