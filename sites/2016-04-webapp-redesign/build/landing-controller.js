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

// hand-transpiled from components/views/landing/landing-controller.ts

angular.module('taskbaseApp')
  .controller('LandingController',
    function($scope, AppSettingsService
    ) {

        $scope.landingPageType = AppSettingsService.getSettings().landingPageType;

    });
