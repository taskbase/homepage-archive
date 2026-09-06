'use strict';

/* jshint browser: true */
/*global angular, $ */



angular.module('taskbaseApp')
    .factory('Login',
        (UserService, Notify, $http, $location, $state, $q, $rootScope, Utils, TrackingService) => {

          return {

            logInByAuthKey: function () {
              let loginData = {
                authkey: $state.params.authkey,
                email: $state.params.email
              };
              this.logIn(loginData, true);
            },

            logIn: (loginData, suppressRedirect?: boolean) => {
              $http.post('/api/login', loginData).then((response) => {
                UserService.setUser().then(userResp => {

                  TrackingService.identify(userResp.data.email);

                  if (!suppressRedirect) {
                    $state.go('home');
                  } else {
                    $state.reload();
                  }
                })
              },(response) => {
                Notify.errorResponse(response, {positionX: 'left'});
              });
            },
            logOut: () => {
              $http.post('/api/logout').then(() => {
                UserService.setLoggedIn(false);
                UserService.setUser().then(() => {
                  $state.go('landing');
                });
              });
            },

            loginPrompt: () => {
              Utils.openModal('login-prompt', 'LoginPrompt');
            }
          };

        });
