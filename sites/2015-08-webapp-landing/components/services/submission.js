'use strict';

/* jshint browser: true */
/*global angular */

angular.module('taskbaseApp').factory('Submission',['$resource',function($resource){
  return $resource('/api/submission/:taskId/:problemIndex',null, {
    update: { method: 'PUT' }
  });
}]);
