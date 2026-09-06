'use strict';

/* jshint browser: true */
/*global angular */

angular.module('taskbaseApp').factory('Objective', ['$resource',
  function($resource) {
    return $resource('/api/objective/:objectiveId', null, {
      update: {
        method: 'PUT'
      }
    });
  }
]).factory('Objectives', ['$resource',
  function($resource) {
    return $resource('/api/objective');
  }
]).factory('ObjectiveChildren', ['$resource',
  function($resource) {
    return $resource('/api/objective/:objectiveId/children');
  }
]).factory('ObjectiveReorder', ['$resource',
  function($resource) {
    return $resource('/api/objective/reorder');
  }
]);
