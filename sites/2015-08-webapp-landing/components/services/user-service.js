'use strict';

/* jshint browser: true */
/*global angular */

angular.module('taskbaseApp').factory('User', ['$resource',
  function($resource) {
    return $resource('/api/user/:userId', null, {
      update: {
        method: 'PUT'
      }
    });
  }]);
