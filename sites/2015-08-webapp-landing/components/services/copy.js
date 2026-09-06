'use strict';

/* jshint browser: true */
/*global angular */

angular.module('taskbaseApp').factory('Copy',['$resource',function($resource){
  return $resource('/api/:resourceName/:resourceId/copy');
}]);
