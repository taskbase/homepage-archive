'use strict';

/* jshint browser: true */
/* global $: true */
/* global angular */

/**
 * @ngdoc function
 * @name taskbaseApp.controller:HeaderController
 * @description # HeaderController Controller of the header
 */

angular.module('taskbaseApp')
  .controller('HeaderController', [
    '$scope',
    '$rootScope',
    '$http',
    '$state',
    'notify',
    'Navigation',
    '$location',
    'User',
    function($scope, $rootScope, $http, $state, notify, Navigation, $location, User) {

      $scope.eMathsOrLanding = $state.current.name === 'landing' ? 'http://e-maths.ch' : '/#/home';

      $scope.loginData = {};

      $scope.goingForward = Navigation.goingForward;

      $http.get('api/settings').then(function(response){
        $rootScope.appSettings = response.data;

        if ($rootScope.appSettings.ldapLogin) {
          $scope.feedbackMail = 'taskbase-feedback@ethz.ch';
          $scope.bugsMail = 'taskbase-bugs@ethz.ch';
        } else {
          $scope.feedbackMail = 'feedback@taskbase.org';
          $scope.bugsMail = 'bugs@taskbase.org';
        }
      });

      var loginFunction = function(loginType, loginData) {
        $http.post('/api/' + loginType, loginData).then(function() {
          $scope.user = User.get(function(response) {

            // Trigger login event (for analytics)
            $(window).trigger("login", [response._id]);

            $rootScope.loggedIn = true;
            $rootScope.user = response;

            if ($location.$$search.next) {
              var next = $location.$$search.next;
              $location.search('next', null);
              $location.path(next);
              $location.replace();
            } else {
              $state.go('home');
            }
          });
        },function(response) {
          if (response.status === 401) {
            $state.go('verify', {email: loginData.email, host: $location.host()});
          }
          notify({message: response.statusText, classes: 'error'});
        });
      };

      $scope.logIn = function() {

        //get settings
        $http.get('api/settings').then(function(response) {
          $scope.settings = response.data;
          //ldap
          if ($scope.settings.ldapLogin === true) {
            loginFunction('ldaplogin', $scope.loginData);
          } else { //not ldap
            loginFunction('login', $scope.loginData);
          }
        });

      };

      $scope.logOut = function() {
        $http.post('api/logout').then(function() {
          $rootScope.loggedIn = false;

          // Trigger logout event (for analytics)
          $(window).trigger("logout");

          $state.go('landing');
        });
      };

    }]);
