define([
  'angular',
  'services/category-service',
  'slick-carousel'
], function(angular) {
  'use strict';

  angular.module('lidikArt.fun', ['ui.router'])
      .config(['$stateProvider',
        function($stateProvider) {
          $stateProvider.state('app.fun', {
            templateUrl: window.globalConfig.path + '/js/fun/index.html',
            url: '/fun',
            controller: function($scope, $stateParams, categoryPosts, shopsService, categoryData, fancyboxService) {
              $scope.images = [];
              categoryData.categories().then(function(categories) {
                var ids = categories.groupedData.art.map(function(item) {
                  return item.ID;
                });
                categoryPosts.getAllPostsByCategories(ids).then(function(data, status, headers, config) {
                  console.log('getAllPostsByCategories', data);
                  renderAllPosts(data);
                });
              });

              shopsService.shops().then(function(data) {
                var shutterstockItems = $.map(data.shutterstock.data, function(item) {
                  item.small = item.assets.preview.url;
                  item.big = item.assets.preview.url;
                  item.ID = item.id;
                  return item;
                });

                //var etsyItems = $.map(data.etsy.results, function(item) {
                //  item.small = item.MainImage.url_170x135;
                //  item.big = item.MainImage.url_fullxfull;
                //  item.ID = item.listing_id;
                //  return item;
                //});

                var behanceItems = $.map(data.behance.projects, function(item) {
                  item.small = item.covers['202'];
                  item.big = item.covers.original;
                  item.ID = item.id;
                  return item;
                });

                //$scope.images = (etsyItems.concat(behanceItems).concat(shutterstockItems));
                console.log('shopsService', behanceItems.concat(shutterstockItems));
                $scope.images = $scope.images.concat(behanceItems.concat(shutterstockItems));

                fancyboxService();

                //console.log('shutterstock', data.shutterstock.data);
              });

              function renderAllPosts(data) {
                $scope.images = $scope.images.concat(data.filter(function(item) {
                  return !!(item.featured_image && item.featured_image.attachment_meta);
                }).map(function(item) {
                  if (item.featured_image.attachment_meta) {
                    item.small = item.featured_image.attachment_meta.sizes['post-thumb'].url.replace('https', 'http');
                    item.big = item.featured_image.source.replace('https', 'http');
                    return item;
                  }
                }));
                fancyboxService();
              }
            }
          });
        }]);
});