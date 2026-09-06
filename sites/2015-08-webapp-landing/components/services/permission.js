'use strict';

/* jshint browser: true */
/*global angular */

angular.module('taskbaseApp')
  .factory('Permission', ['$resource', function($resource) {
    return $resource('/api/permission');
  }])
  .factory('ResourcePermission', ['$resource', function($resource) {
    return $resource('/api/:resourceName/:resourceId/permission');
  }]);
