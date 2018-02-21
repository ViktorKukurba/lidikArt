define([
  'angular',
  'services/category-service',
  'services/utils-service'
], function(angular) {
  'use strict';
  angular.module('lidikArt.decor', ['ui.router', 'ngSanitize', 'services'])
    .config(['stateManagerProvider',
      function (stateManagerProvider) {
        function loadPosts(categoryPosts, categoryData) {
          return categoryData.pagesCategories().then(function(response) {
            var pages = response.pages;
            var categories = pages.data.filter(function(page) {
              return page.slug === 'decor';
            })[0].categories;
            var ids = categories.production.map(function(category) {
              return category.id;
            });
            return categoryPosts.getPostsByCategories(ids).then(function(data, status, headers, config) {
              return  {
                posts: data,
                categories: categories
              };
            });
          });
        }

        var decor = {
          name: 'app.decor',
          url: '/decor',
          template: '<ui-view/>',
          abstract: true,
        };

        var defaultDecor = {
          name: 'app.decor.default',
          templateUrl: require.toUrl('decor/index.html'),
          url: '',
          controller: function ($scope, categoryPosts, categoryData, fancyRender) {
            loadPosts(categoryPosts, categoryData).then(function(response) {
              fancyRender($scope, response.posts.data);
            });
          }
        };

        var defaultDecorPicture = {
          name: 'app.decor.default.picture',
          url: '/{id:pic-[0-9]{1,}}'
        };

        stateManagerProvider.register(
            decor,
            defaultDecor,
            defaultDecorPicture);
      }]);
});
