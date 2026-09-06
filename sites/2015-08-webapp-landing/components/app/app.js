'use strict';

/* jshint browser: true */
/*global angular, MathJax, google*/

/**
 * Main module of the application.
 */

 
angular
  .module('taskbaseApp',[
    'ui.router',
    'ui.bootstrap',
    'ngAnimate',
    'ui.ace',
    'ngTagsInput',
    'textAngular',
    'contenteditable',
    'cgNotify',
    'ngLoadingSpinner',
    'naif.base64',
    'ngResource',
    'ngFileUpload',
    'ngSanitize',
    'uiSwitch',
    'dndLists',
    'youtube-embed',
    'angucomplete-alt',
    'popoverToggle',
    'rzModule'
  ]);

  google.load('visualization', '1.0', {'packages':['corechart','line']});


//Configuration for Mathjax
MathJax.Hub.Config({
 tex2jax: {
   inlineMath: [['$','$'], ['\\(','\\)']],
   displayMath: [ ['$$','$$'], ['\[','\]'] ],
   balanceBraces: true,
   processEscapes: true,
   processRefs: true,
   processEnvironments: true,
 }
});

// Configuration for notify
angular.module('taskbaseApp')
  .run(['notify', function(notify) {
    notify.config({
      duration: 1500
    });
  }]);
