'use strict';

/* jshint browser: true */
/*global angular */

angular.module('taskbaseApp')
  .controller('InvestorController', function($scope, Utils: Utils){

    // The literal password and the Google Docs links behind this gate were
    // removed before this archive was published. Both were internal.
    $scope.revealConditionally = () => {
      if ($scope.password === 'REDACTED') {
        $scope.showInvestorSection = true;
      }
    };

    $scope.enterOnKeypress = (e) => {
      var charCode = e.charCode || e.keyCode || e.which;
      if(charCode === 13) {
        $scope.revealConditionally();
      }
    };

    $scope.links = [{
      title: 'Survey Analysis',
      url: 'REDACTED'
    }, {
      title: 'Lead Analysis',
      url: 'REDACTED'
    }, {
      title: 'Copyright Analysis',
      url: 'REDACTED'
    }, {
      title: 'Development Roadmap',
      url: 'REDACTED'
    }, {
      title: 'Sales Process',
      url: 'REDACTED'
    }, {
      title: 'Financial Figures',
      url: 'REDACTED'
    }]

  });
