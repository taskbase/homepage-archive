'use strict';

/*global angular */

angular.module('taskbaseApp')
  .directive('referenceItem', () =>{
    return {
      restrict: 'E',
      templateUrl: '/components/directives/reference-item/reference-item-directive.html',
      scope: {
        item: '='
      },
      link: () => {
        
      }
    };

  });
