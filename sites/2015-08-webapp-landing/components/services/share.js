'use strict';

/* jshint browser: true */
/*global angular */

angular.module('taskbaseApp')
  .service('Share', [function() {

    var addedTaskIds = [];

    var versions = [];
    var currentOrigin = "";

    return {

      getAddedTaskIds: function() {
        return addedTaskIds;
      },
      setAddedTaskIds: function(array) {
        addedTaskIds = array;
      },

      getVersions: function() {
        return versions;
      },
      setVersions: function(array) {
        versions = array;
      },

      getCurrentOrigin: function() {
        return currentOrigin;
      },
      setCurrentOrigin: function(str) {
        currentOrigin = str;
      }

    };
  }]);
