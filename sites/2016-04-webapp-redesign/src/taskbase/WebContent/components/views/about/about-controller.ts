'use strict';

/* jshint browser: true */
/*global angular */

angular.module('taskbaseApp')
  .controller('AboutController', ($scope) =>{

    $scope.typedOptions = {strings: ["is to empower teachers.",
                           "is to engage students.",
                           "is to improve education." ]};

    $scope.team = [[{
      name: "Samuel",
      lastName: "Portmann",
      texts: ["Business Development"]
    }, {
      name: "Jost",
      lastName: "Joller",
      texts: ["Software Development"]

    }],[ {
      name: "Daniel",
      lastName: "Niederberger",
      texts: ["Software Development"]
    }, {
      name: "Urs",
      lastName: "Zellweger",
      texts: ["Lehrer & Berater"]
    }],[ {
      name: "Dominique",
      lastName: "Gisin",
      texts: ["Öffentlichkeitsarbeit"]
    }]];

    $scope.advisors = [[{name: "Enrico", lastName: "DeGiorgi", texts:["Prof. Mathematik HSG"]},
      {name: "Norbert", lastName: "Hungerbühler", texts:["Prof. Mathematik ETH"]}],[
      {name: "Boris", lastName: "Lautenbach",texts: ["Rechtlicher Berater"]},
      {name: "Timo", lastName: "Looser", texts: ["Strategischer Berater"]}],[
      {name: "Martin", lastName: "Mohr", texts: ["Didaktik Experte"]},
      {name: "Samuel", lastName: "Fricker", image: "Fricker", texts: ["Prof. Requirements Engineering FHNW"]}],[
      {name: "Max", lastName: "Meister", texts: ["Serial Entrepreneur"]}
    ]];

    $scope.isEven = (n) => {
      return n % 2 === 0;
    };

  });
