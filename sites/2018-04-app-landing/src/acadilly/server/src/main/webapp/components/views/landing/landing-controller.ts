'use strict';

angular.module('acadillyApp')
  .controller('LandingController',
    function ($scope, AppSettingsService: AppSettingsService) {
      $scope.appId = AppSettingsService.getSettings().id;
    });
