'use strict';
var myApp = angular
    .module('taskbaseApp', [
      'ui.router',
      'ui.bootstrap',
      'ngAnimate',
      //'textAngular',
      'ui-notification',
      'ngResource',
      'ngFileUpload',
      'ngSanitize',
      //'ngTagsInput',
      //'ngRaven',
      'taskbaseFilters',
      'dndLists',
      //remove at some point
      'naif.base64',
      'youtube-embed',
      'ngMaterial',
      'md.data.table',
      'pw.canvas-painter',
      'MathjaxParser'
    ]);

myApp.config(function ($animateProvider, $mdThemingProvider) {
  $animateProvider.classNameFilter(/angular-animate/);

  var primary = '169688';
  if (window.location.hostname.indexOf("e-maths") > -1) {
    primary = '66594B';
  }

  $mdThemingProvider.definePalette('taskbasePalette', {
    '50': primary,
    '100': primary,
    '200': primary,
    '300': primary,
    '400': primary,
    '500': primary,
    '600': primary,
    '700': primary,
    '800': primary,
    '900': primary,
    'A100': primary,
    'A200': primary,
    'A400': primary,
    'A700': primary,
    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                        // on this palette should be dark or light

    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
      '200', '300', '400', 'A100'],
    'contrastLightColors': undefined    // could also specify this if default was 'dark'
  });

  $mdThemingProvider.theme('default')
      .primaryPalette('taskbasePalette')
      .accentPalette('taskbasePalette');

});

