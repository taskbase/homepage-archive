'use strict';

/* jshint browser: true */
/*global angular */

angular.module('taskbaseApp')
  .factory('Store', ['$resource', function($resource) {
    return $resource('/api/store/:resourceName');
  }]);
