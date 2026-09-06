'use strict';

/* jshint browser: true */
/*global angular */

/**
 * Controller of the footer
 */
// hand-transpiled from components/footer/footer-controller.ts
angular.module('taskbaseApp')
  .controller('FooterController', function ($state, $scope, UserService, Utils,
                                            AppSettingsService
  ) {

    $scope.secondaryFooter = () => {
      return !UserService.loggedIn() && AppSettingsService.getSettings().hasSecondaryFooter;
    };

    $scope.urlContains = Utils.urlContains;

  });
