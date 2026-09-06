'use strict';

/* jshint browser: true */
/*global angular */

angular.module('taskbaseApp')
  .factory('ResourceMessage', ['$resource', function($resource) {
    return $resource('/api/:resourceName/:resourceId/message', null,
      {
        update: {method: 'PUT'}
      });
  }])
  .factory('Message', ['$resource', function($resource) {
    return $resource('/api/message/:messageId', null,
      {
        update: {method: 'PUT'}
      });
  }]);
