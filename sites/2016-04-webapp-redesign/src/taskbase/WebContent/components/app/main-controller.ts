'use strict';

/* jshint browser: true */
/* global angular*/


angular.module('taskbaseApp')
  .controller('MainController', 

    ($scope, $rootScope, $http, $location, $q, $state, UserService, Utils: Utils) => {

      // used to preload: app settings, user and loggedIn
      $rootScope.appReady = false;

      var promises = [];

      promises.push(UserService.setUser());

      $q.all(promises).then(() => {
        $rootScope.appReady = true;
      });

      $scope.urlContains = Utils.urlContains;

    });

 
