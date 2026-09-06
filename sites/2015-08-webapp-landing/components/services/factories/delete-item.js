'use strict';

/* jshint browser: true */
/*global angular, confirm */

angular.module('taskbaseApp')
  .factory('DeleteFactory', ['$http', function($http) {
    return {
      deleteItem: function(idx, array) {
        array.splice(idx, 1);
      },
      deleteItemWithConfirmation: function(idx, array, withConfirmation, api) {
        if (confirm("Do you really want to delete this?")) {
          array.splice(idx, 1);
          $http.put(api,array);
        }
      }
    };
  }]);
