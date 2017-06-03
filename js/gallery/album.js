define([
  'angular',
  'services/shops-service',
  'services/fancybox-service',
  'gallery/gallery'
], function(angular) {
  angular.module('lidikArt.gallery', ['ezfb'])
      .config(function($stateProvider) {
        var galleryData;
        var categories = [];
        function loadPosts(categoryPosts, categoryData) {
          return categoryData.pagesCategories().then(function(response) {
            var pages = response.pages;
            var categories = pages.data.filter(function(page) {
              return page.slug === 'gallery';
            })[0].categories;
            var ids = categories.art.map(function(category) {
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
        function galleryController($scope, $stateParams, categoryPosts, categoryData, fancyRender) {
          if (!galleryData) {
            loadPosts(categoryPosts, categoryData).then(function(response) {
              galleryData = response;
              categories = galleryData.categories.art.filter(function(item) {
                  return item.slug.indexOf('-no-show') === -1;
              }).map(function(item) {
                item.link =  $stateParams.lang + '/series/' + item.slug;
                return item;
              });
              categories.unshift({
                link: $stateParams.lang + '/',
                name: $stateParams.lang ? 'All' : 'Усе'
              });
              $scope.categories = categories;
              setCategory();

              fancyRender($scope, galleryData.posts.data.filter(function (item) {
                  return !!item.better_featured_image &&
                      (!$scope.category || $.inArray($scope.category.id, item.categories) != -1);
              }));
            });
          } else {
              $scope.categories = categories;
              setCategory();
              fancyRender($scope, galleryData.posts.data.filter(function (item) {
                  return !!item.better_featured_image &&
                      (!$scope.category || $.inArray($scope.category.id, item.categories) != -1);
              }));
          }
          function setCategory() {
              if ($stateParams.name) {
                  $scope.category = categories.filter(function (item) {
                      return item.slug === $stateParams.name;
                  })[0];
              } else {
                  $scope.category = '';
              }
          }
        }

        $stateProvider.state('app.gallery', {
          abstract: true,
          template: '<ui-view></ui-view>',
          url: '',
          controller: function($state) {
            if (!$state.params.name) {
              var name = $state.current.name;
              var params = $state.params;
              $state.go('app.gallery.default').then(function() {
                if (params.lang == '/en') {
                  params.lang = 'en';
                }
                $state.go(name, params);
              });
            }
          }
        });

        $stateProvider.state('app.gallery.default', {
          url: '/',
          templateUrl: require.toUrl('gallery/album.html'),
          controller: galleryController
        });

        $stateProvider.state('app.gallery.series', {
          url: '/series/:name',
          // template: '',
          templateUrl: require.toUrl('gallery/album.html'),
          controller: galleryController
        });

        $stateProvider.state('app.gallery.series.picture', {
          url: '/{id:pic-[0-9]{1,}}'
        });

        $stateProvider.state('app.gallery.default.picture', {
          url: '{id:pic-[0-9]{1,}}',
          controller: function($stateParams) { }
        });

        $stateProvider.state('app.shops', {
          templateUrl: require.toUrl('gallery/album.html'),
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
