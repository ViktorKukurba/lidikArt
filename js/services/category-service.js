define([
  'angular'
], function(angular) {
  'use strict';
//lidikArt.SERVICE_URL = 'http://localhost/lidik/public_html/';
  var SERVICE_URL = '/wp-json/wp/v2/';
  //var SERVICE_URL = 'public/index.php';

  angular.module('lidikArt').factory('categoryData', ['$http', '$translate', '$q', function ($http, $translate, $q) {
    var url = SERVICE_URL + 'categories';
    //var url = SERVICE_URL + '?json_route=/taxonomies/category/terms';
    var pagesUrl = SERVICE_URL + 'pages';
    //var pagesUrl = SERVICE_URL + '?json_route=/pages';

    var artOrder = {
      'fairy-land': 1,
      'nation-bloom': 2,
      'ukrainian-nymphs': 3,
      'sleep-dreams': 4,
      'war-is-the-suicide': 5,
      'subconscious': 6
    };

    var productOrder = {
      'eco-bags': 1,
      'exclusive-kitchen-boards': 2,
      'interior-decoration': 3,
      'fabric-painting-prints': 4

    };

    return {
      categories: function() {
        return $http.get(url + '?lang=' + $translate.use() + "&per_page=100").then(function (response, status, headers, config) {
          var data = {};
          response.data.forEach(function(category) {
            var parent = category.parent;
            if (category.parent) {
              data[parent] = data[parent] || [];
              data[parent].push(category);
            }
          });

          //data.art.sort(function(a, b) {
          //  return  artOrder[a.slug] - artOrder[b.slug];
          //});
          //
          //data.production.sort(function(a, b) {
          //  return  productOrder[a.slug] - productOrder[b.slug];
          //});

          response.groupedData = data;
          return response;
        });
      },
      pages: function() {
        return $http.get(pagesUrl + '?lang=' + $translate.use()).
            then(function(response, status, headers, config) {
              response.data.sort(function(a, b) {
                return a.menu_order - b.menu_order;
              });
              return response;
            });
      },
      data: function() {
        return $q.all({
          categories: this.categories(),
          pages: this.pages()
        });
      },
      groupedCategories: function() {
        return this.categories().then(function (response, status, headers, config) {
          var data = {};
          response.data.forEach(function(category) {
            var parent = category.parent;
            if (category.parent) {
              data[parent.slug] = data[parent.slug] || [];
              data[parent.slug].push(category);
            }
          });

          response.groupedData = data;
          return response;
        });
      },

      pagesCategories: function() {
        return this.data().then(function(response) {
          var pages = response.pages.data;
          var categories = response.categories.data;
          pages.forEach(function(page) {
            var ids = page.categories;
            page.categories = categories.filter(function(category) {
              return $.inArray(category.id, ids) != -1;
            });
          });
          response.pagesCategories = pages;
          return response;
        });
      }
    };
  }]).factory('categoryPosts', ['$http', '$translate', '$q', function ($http, $translate, $q) {
    var url = SERVICE_URL + 'posts?per_page=100&categories=';
    //var url = SERVICE_URL + '?json_route=/posts&filter[cat]=';
    var termURL = SERVICE_URL + 'categories/';
    //var termURL = SERVICE_URL + '?json_route=/taxonomies/category/terms/';
    return {
      getPosts: function (categoryId) {
        return $http.get(url + categoryId + '?lang=' + $translate.use());
      },
      getAllPosts: function() {
        return $http.get(SERVICE_URL + 'posts?per=1000&lang=' + $translate.use());
      },
      getAllPostsByCategories: function(categories) {
        categories = categories || [];
        var requests = {};
        categories.forEach(function(id) {
          requests['cat' + id] = $http.get(url + id + '&lang=' + $translate.use());
        });
        return $q.all(requests).then(function(categories) {
          var posts = [];
          for (var cat in categories) {
            if (categories.hasOwnProperty(cat)) {
              posts = posts.concat(categories[cat].data);
            }
          }
          return posts;
        });
      },
      getPostsByCategories: function(categoriesIds) {
        return $http.get(url + categoriesIds.join(',') + '&lang=' + $translate.use());
      },
      getCategoryData: function (categoryId) {
        return $q.all({
          category: $http.get(termURL + categoryId + '?lang=' + $translate.use()),
          posts: $http.get(url + categoryId + '&lang=' + $translate.use())
        });
      }
    };
  }]);
});
