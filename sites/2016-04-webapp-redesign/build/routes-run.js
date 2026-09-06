/**
 * Redirect the user to the sign up page when the user is not logged in
 */

// hand-transpiled from the `.run()` block at the bottom of
// components/app/routes.ts.
// MUSEUM DEVIATION: the two analytics paths are dropped -- the ActionService
// PAGE_VIEW transaction posted on every location change / beforeunload, and
// the `ga('send','pageview')` / `ga('set','userId')` calls. The contract for
// this collection says strip trackers. Everything else is the era logic.
angular.module('taskbaseApp')
    .run(
        function ($rootScope, $window, $state, $http, $location, $stateParams, $uibModalStack,
                  PermissionService,
                  UserService, $q, Current, $timeout) {

          $rootScope.$on('$stateChangeStart', function (ev, to, toParams) {

            //ScrollService.cacheScrollPos();

            //courses
            var slugmap = {
              'mathe-matura-aufgaben': '56aa6de2c7e0ea0022e42461'
            };

            if (slugmap.hasOwnProperty(toParams.containerId)) {
              ev.preventDefault();
              $state.transitionTo('course', {containerId: slugmap[toParams.containerId]});
            }
          });
          $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {

            //HACK to at least clear student view on homescreen.
            let clearStudentView = to.name === 'home';
            PermissionService.clearPermissions(clearStudentView);

            //correct nav
            //close all modal windows
            $uibModalStack.dismissAll();

            //back button
            $rootScope.previousStates = $rootScope.previousStates || {};

            if ($rootScope.goingForward) {
              $rootScope.previousStates[to.name + JSON.stringify(toParams)] = {
                fromName: from.name,
                fromParams: fromParams
              };
              $rootScope.goingForward = false;
            } else {
              $rootScope.goingForward = false;
            }
          });
        });
