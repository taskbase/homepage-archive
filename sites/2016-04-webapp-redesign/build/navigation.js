'use strict';

/* jshint browser: true */
/*global angular */

// hand-transpiled from components/services/navigation.ts

angular.module('taskbaseApp')
  .factory('Navigation', ($rootScope) => {
    return {
      goingForward: () => {
        $rootScope.goingForward = true;
      }
    };
  });
