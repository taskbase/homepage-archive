'use strict';

/* jshint browser: true */
/*global angular */

angular.module('taskbaseApp')
  .factory('Navigation', ($rootScope) => {
    return {
      goingForward: () => {
        $rootScope.goingForward = true;  
      }
    };
  });
