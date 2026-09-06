'use strict';

/* jshint browser: true */
/*global angular */

angular.module('taskbaseApp')
  .factory('Navigation', ['$rootScope', function($rootScope) {
    return {
      goingForward: function() {
        $rootScope.goingForward = true;  
      }
    };
  }]);
