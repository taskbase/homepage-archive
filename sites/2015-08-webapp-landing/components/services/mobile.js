'use strict';

/* jshint browser: true */
/*global angular */

angular.module('taskbaseApp')
  .factory('Mobile', ['$scope', function($scope) {
    return {
      onMobile: function() {
        $scope.onMobile = window.innerWidth < 768;
        angular.element(window).resize(function() {
          $scope.onMobile = window.innerWidth < 768;
          $scope.$apply();
        });
      }
    };
  }]);
