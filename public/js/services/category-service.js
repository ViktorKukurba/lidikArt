define([
  'angular'
], function(angular) {
  'use strict';
//lidikArt.SERVICE_URL = 'http://localhost/lidik/public_html/';
  var SERVICE_URL = '../';

  angular.module('lidikArt').factory('categoryData', ['$http', '$translate', '$q', function ($http, $translate, $q) {
    var url = SERVICE_URL + '?json_route=/taxonomies/category/terms';
    var pagesUrl = SERVICE_URL + '?json_route=/pages';
    //console.log('dd', $translate.use());
    return {
      categories: function() {
        return $http.get(url + '&lang=' + $translate.use());
      },
      pages: function() {
        return $http.get(pagesUrl + '&lang=' + $translate.use());
      },
      data: function() {
        return $q.all({
          categories: this.categories(),
          pages: this.pages()
        });
      }
    };
  }]).factory('categoryPosts', ['$http', '$translate', function ($http, $translate) {
    var url = SERVICE_URL + '?json_route=/posts&filter[cat]=';
    return {
      getPosts: function (categoryId) {
        return $http.get(url + categoryId + '&lang=' + $translate.use());
      }
    };
  }]);
});
