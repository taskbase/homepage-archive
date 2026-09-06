'use strict';

/* jshint browser: true */
/*global angular */

angular.module('taskbaseApp').factory('Course', ['$resource',
  function($resource) {
    return $resource('/api/course/:courseId', null, {
      update: {
        method: 'PUT'
      }
    });
  }]);
