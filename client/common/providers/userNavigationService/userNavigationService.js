"use strict";

require('./../_module_init.js')
  .service('UserNavigationService',
    [         '$state',
      function($state) {
        return {
          /**
           * @ngdoc function
           * @name UserNavigationService#navigateTo
           * @methodOf UserNavigationService
           *
           * @description
           * Wrapper method around ui.router.state.$state#go to transition to a new state.
           * `navigateTo` calls `$state.go` in the angular-ui-router project which calls
           * `$state.transitionTo` internally but automatically sets options to
           * `{ location: true, inherit: true, relative: $state.$current, notify: true }`.
           * This allows you to easily use an absolute or relative to path and specify
           * only the parameters you'd like to update (while letting unspecified parameters
           * inherit from the currently active ancestor states).
           *
           * @example
           * <pre>
           * var app = angular.module('app', ['ui.router']);
           *
           * app.controller('ctrl', function ($scope, $state) {
           *   $scope.changeState = function () {
           *     $state.go('contact.detail');
           *   };
           * });
           * </pre>
           * <img src='../ngdoc_assets/StateGoExamples.png'/>
           *
           * @param {string} to Absolute state name or relative state path. Some examples:
           *
           * - `$state.go('contact.detail')` - will go to the `contact.detail` state
           * - `$state.go('^')` - will go to a parent state
           * - `$state.go('^.sibling')` - will go to a sibling state
           * - `$state.go('.child.grandchild')` - will go to grandchild state
           *
           * @param {object=} params A map of the parameters that will be sent to the state,
           * will populate $stateParams. Any parameters that are not specified will be inherited from currently
           * defined parameters. This allows, for example, going to a sibling state that shares parameters
           * specified in a parent state. Parameter inheritance only works between common ancestor states, I.e.
           * transitioning to a sibling will get you the parameters for all parents, transitioning to a child
           * will get you all current parameters, etc.
           * @param {object=} options Options object. The options are:
           *
           * - **`location`** - {boolean=true|string=} - If `true` will update the url in the location bar, if `false`
           *    will not. If string, must be `"replace"`, which will update url and also replace last history record.
           * - **`inherit`** - {boolean=true}, If `true` will inherit url parameters from current url.
           * - **`relative`** - {object=$state.$current}, When transitioning with relative path (e.g '^'),
           *    defines which state to be relative from.
           * - **`notify`** - {boolean=true}, If `true` will broadcast $stateChangeStart and $stateChangeSuccess events.
           * - **`reload`** (v0.2.5) - {boolean=false}, If `true` will force transition even if the state or params
           *    have not changed, aka a reload of the same state. It differs from reloadOnSearch because you'd
           *    use this when you want to force a reload when *everything* is the same, including search params.
           *
           * @returns {promise} A promise representing the state of the new transition.
           *
           * Possible success values:
           *
           * - $state.current
           *
           * <br/>Possible rejection values:
           *
           * - 'transition superseded' - when a newer transition has been started after this one
           * - 'transition prevented' - when `event.preventDefault()` has been called in a `$stateChangeStart` listener
           * - 'transition aborted' - when `event.preventDefault()` has been called in a `$stateNotFound` listener or
           *   when a `$stateNotFound` `event.retry` promise errors.
           * - 'transition failed' - when a state has been unsuccessfully found after 2 tries.
           * - *resolve error* - when an error has occurred with a `resolve`
           *
           */
          navigateTo: function(to, /**Object=*/params, options) {
            console.log('Transitioning to state: ', to, params, options);
            return $state.go(to, params, options);
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
  );
