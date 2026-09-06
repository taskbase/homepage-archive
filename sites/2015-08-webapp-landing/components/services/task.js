'use strict';

/* jshint browser: true */
/*global angular */

angular.module('taskbaseApp').factory('Task',['$resource',function($resource){
  return $resource('/api/task/:taskId',null,
  {
    update: {method: 'PUT'}
  });
}]).factory('TaskReorder',['$resource',function($resource){
  return $resource('/api/taskreorder');
}]);
