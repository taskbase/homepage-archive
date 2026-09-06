'use strict';

/* jshint browser: true */
/*global angular */

angular.module('taskbaseApp')
  .factory('Collection', ['$resource', function($resource) {
    return $resource('/api/collection/:collectionId', null,
      {
        update: {method: 'PUT'}
      });
  }]);
