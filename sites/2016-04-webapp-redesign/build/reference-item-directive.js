'use strict';

/*global angular */

// hand-transpiled from components/directives/reference-item/reference-item-directive.ts

angular.module('taskbaseApp')
  .directive('referenceItem', () =>{
    return {
      restrict: 'E',
      templateUrl: 'components/directives/reference-item/reference-item-directive.html',
      scope: {
        item: '='
      },
      link: () => {

      }
    };

  });
