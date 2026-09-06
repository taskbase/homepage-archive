'use strict';

/* jshint browser: true */
/* global angular */


angular.module('taskbaseApp')
  .controller('MainController', ['$scope','$rootScope', '$http', '$location', 'User', '$q',
    function($scope, $rootScope, $http, $location, User, $q) {

      var promises = [];
      
      promises.push($http.get('api/settings').then(function(response){
        $rootScope.appSettings = response.data;
      }));

      promises.push($http.get('api/login').then(function(response) {
        if (response.data.loggedIn === true) {
          $rootScope.loggedIn = true;
        } else {
          $rootScope.appReady = true;
          $rootScope.loggedIn = false;
        }
      }));

      $q.all(promises).then(function() {
        User.get(function(response) {
          $rootScope.user = response;
          $rootScope.appReady = true;
        });
      });

      $scope.urlContains = function(hostSlice) {
        return $location.host().indexOf(hostSlice) > -1;
      };

    }]);

 
