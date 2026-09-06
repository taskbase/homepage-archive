'use strict';

/* jshint browser: true */
/*global angular, $ */

/**
 * @ngdoc function
 * @name taskbaseApp.controller:SignupController
 * @description
 * # SignupController
 * Controller of the sign up
 */

angular.module('taskbaseApp')
  .controller('LandingController', 
    function($scope, AppSettingsService: AppSettingsService
    ) {

        $scope.landingPageType = AppSettingsService.getSettings().landingPageType;

    });
