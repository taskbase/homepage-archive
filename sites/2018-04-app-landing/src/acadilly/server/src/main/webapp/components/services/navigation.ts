'use strict';

/* jshint browser: true */
/*global angular */

angular.module('acadillyApp')
  .factory('Navigation', ($rootScope) => {
    return {
      goingForward: () => {
        $rootScope.goingForward = true;  
      }
    };
  });
