define([
  'angular',
  'services/category-service'
], function(angular) {
  'use strict';
//lidikArt.SERVICE_URL = 'http://localhost/lidik/public_html/';
  var SERVICE_URL = '../';

  angular.module('lidikArt').factory('categoryData', ['$http', function ($http) {
    var url = SERVICE_URL + '?json_route=/taxonomies/category/terms';
    return $http.get(url);
  }]).factory('categoryPosts', ['$http', function ($http) {
    var url = SERVICE_URL + '?json_route=/posts&filter[cat]=';
    return {
      getPosts: function (categoryId) {
        return $http.get(url + categoryId);
      }
    }
  }]);
});
