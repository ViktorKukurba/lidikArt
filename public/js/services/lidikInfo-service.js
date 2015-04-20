define([
  'angular',
  'services/category-service'
], function(angular) {
  'use strict';
  var SERVICE_URL = '../';
  angular.module('lidikArt').factory('lidikInfo', ['$http', function ($http) {
    var url = SERVICE_URL + '?json_route=/pages';
    return $http.get(url);
  }]);
});
