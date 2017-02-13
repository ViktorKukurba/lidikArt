define([
  'angular',
  'services/shops-service',
  'services/fancybox-service',
  'gallery/gallery',
  'fancybox-thumbs',
  'fancybox-buttons'
], function(angular) {
  angular.module('lidikArt.gallery', ['ezfb'])
      .config(function($stateProvider) {
        $stateProvider.state('app.album', {
          templateUrl: window.globalConfig.path + 'js/gallery/album.html',
          url: '/production/{album}',
          //url: '/gallery/{type}/{album}',
          controller: function($scope, $stateParams, categoryPosts, fancyboxService, translator) {
            categoryPosts.getCategoryData($stateParams.album).
                then(function(data, status, headers, config) {
                  renderData(data);
                });

            function renderData(data, status, headers, config) {
              $scope.images = data.posts.data.filter(function(item) {
                return !!item.better_featured_image;
              }).map(function(item) {
                item.title = $('<textarea />').html(item.title.rendered).text();
                item.small = item.better_featured_image.media_details.sizes.medium.source_url.replace('https', 'http');
                item.big = item.better_featured_image.source_url.replace('https', 'http');
                return item;
              });

              data.category.data.description =
                  translator.translate(data.category.data.description);

              $scope.category = data.category.data;
              fancyboxService();
            }
          }
        });

        $stateProvider.state('app.gallery', {
          templateUrl: window.globalConfig.path + 'js/gallery/album.html',
          url: '/gallery',
          //url: '/gallery/{type}/{album}',
          controller: function($scope, $stateParams, categoryPosts, categoryData, fancyboxService, ezfb) {
            categoryData.pages().then(function(pages) {
              var ids = pages.data.filter(function(page) {
                return page.slug === 'gallery';
              })[0].categories;
              categoryPosts.getPostsByCategories(ids).then(function(data, status, headers, config) {
                renderAllPosts(data.data);
              });

            });

            function renderAllPosts(data) {
              $scope.images = data.filter(function(item) {
                return !!item.better_featured_image;
              }).map(function(item) {
                item.title = $('<textarea />').html(item.title.rendered).text();
                item.small = item.better_featured_image.media_details.sizes.medium.source_url.replace('https', 'http');
                item.big = item.better_featured_image.source_url.replace('https', 'http');
                return item;
              });
              fancyboxService();
            }
          }
        });

        $stateProvider.state('app.shops', {
          templateUrl: window.globalConfig.path + '/gallery/album.html',
          url: '/shops',
          controller: function($scope, $stateParams, shopsService, fancyboxService) {
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
              $scope.images = behanceItems.concat(shutterstockItems);

              fancyboxService();
            });
          }
        });
      });

});
