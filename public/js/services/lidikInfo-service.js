define([
  'angular'
], function(angular) {
  'use strict';
  var SERVICE_URL = '../';
  angular.module('lidikArt').factory('lidikInfo', ['$http', '$translate', function ($http, $translate) {
    var url = SERVICE_URL + '?json_route=/pages&lang=' + $translate.use();
    return $http.get(url);
  }]);
});
