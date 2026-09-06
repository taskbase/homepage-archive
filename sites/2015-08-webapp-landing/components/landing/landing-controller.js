'use strict';

/* jshint browser: true */
/*global angular */

/**
 * @ngdoc function
 * @name taskbaseApp.controller:SignupController
 * @description
 * # SignupController
 * Controller of the sign up
 */

angular.module('taskbaseApp')
  .controller('LandingController', ['$scope', '$location', '$state', function($scope, $location, $state) {

      $scope.goToTest = function() {
        $state.go('https://test.taskbase.org/#/test?course=55d4ee5ce33bc74210f165d0&collection=55d4ebdae33bc74210f165ce&courseStudent=55d5cf8ce33bc75362201d32&collectionRead=55d4cd2de33bc74210f16246');
      };

    }]);
