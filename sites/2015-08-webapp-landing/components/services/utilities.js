'use strict';

/* jshint browser: true */
/*global angular */

angular.module('taskbaseApp')
  .factory('Utils', ['notify', function(notify) {
    return {
      colorFromHexString: function(n,str) {
        return '#' + str.slice(n*6, (n+1)*6);
      },
      notifyError: function(response) {
        notify({
          message: response.statusText,
          classes: 'error'
        });
      }
    };
  }]);
