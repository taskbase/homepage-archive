'use strict';

/* jshint browser: true */
/*global angular */

// hand-transpiled from components/services/my-filters.ts

var app = angular.module('taskbaseApp');

app.filter('capitalize', () => {
    return (input) => {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    };
});

app.filter('orderObjectBy', () => {
  return (items, field, reverse) => {
    var filtered = [];
    angular.forEach(items, (item) => {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) {
      filtered.reverse();
    }
    return filtered;
  };
});
