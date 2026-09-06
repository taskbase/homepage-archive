'use strict';

var modules = [
  'ui.router',
  'ui.bootstrap',
  'ngAnimate',
  'ui-notification',
  'ngResource',
  'ngFileUpload',
  'ngSanitize',
  'appFilters',
  'MathjaxParser',
  'naif.base64',
  'ngMaterial',
  'pw.canvas-painter',
  'dndLists'
];

const myApp = angular
    .module('acadillyApp', modules);

myApp.config(function ($animateProvider, $mdThemingProvider) {
  $animateProvider.classNameFilter(/angular-animate/);

  let primary = '169688';
  if (location.hostname.indexOf("e-maths") > -1) {
    primary = '66594B';
  } else if (location.hostname.indexOf("acadilly") > -1) {
    primary = '134196'
  } else if (location.hostname.indexOf("mathbridge") > -1) {
    primary = '76AFAD'
  }

  $mdThemingProvider.definePalette('appPalette', {
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
      .primaryPalette('appPalette')
      .accentPalette('appPalette');

});

