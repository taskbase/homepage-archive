'use strict';

/* jshint browser: true */
/*global angular */

/**
 * Controller of the footer
 */
angular.module('acadillyApp')
  .controller('FooterController', function ($state, $scope, UserService, Utils: Utils,
                                            AppSettingsService: AppSettingsService
  ) {

    $scope.secondaryFooter = () => {
      return !UserService.loggedIn() && AppSettingsService.getSettings().hasSecondaryFooter;
    };

    $scope.urlContains = Utils.urlContains;

    $scope.currentDate = new Date();

  });
