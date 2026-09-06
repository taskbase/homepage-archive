'use strict';

/* jshint browser: true */
/*global angular */

angular.module('taskbaseApp').factory('CourseBlocks', ['$resource',
  function($resource) {
    return $resource('/api/course/:courseId/objective');
  }]).factory('Block', ['$resource',
  function($resource) {
    return $resource('/api/block/:blockId', null, {
      update: {
        method: 'PUT'
      }
    });
  }]).factory('CourseBlocks2', ['$resource',
  function($resource) {
    return $resource('/api/course/:courseId/block');
  }]);
