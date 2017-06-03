define([
  'angular',
  'services/category-service',
  'angular-translate',
  'angular-translate-loader-static',
  'angular-easyfb',
  'services/fancybox-service'
], function(angular) {
  'use strict';
  angular.module('lidikArt.production', ['ezfb'])
    .config(['$stateProvider',
      function ($stateProvider) {
        $stateProvider.
        state('app.production', {
          url: '/production',
          template: '<ui-view/>',
          abstract: true,
          controller: ProductionController
        });

        $stateProvider.
            state('app.production.default', {
            templateUrl: require.toUrl('gallery/index.html'),
            url: '',
            controller: function(galleryInit) {
                galleryInit('.gallery-cat .la-img');
            }
          });

        $stateProvider.state('app.production.album', {
          templateUrl: require.toUrl('gallery/album.html'),
          url: '/{album}',
          controller: ProductionAlbumController
        });

        $stateProvider.state('app.production.album.picture', {
          templateUrl: require.toUrl('gallery/album.html'),
          url: '/{id:pic-[0-9]{1,}}'
        });

        function ProductionAlbumController($scope, $stateParams, categoryPosts, fancyRender, translator) {
            categoryPosts.getCategoryData($stateParams.album).then(function (data, status, headers, config) {
                data.category.data.description = translator.translate(data.category.data.description);
                $scope.category = data.category.data;
                $scope.title = data.category.data.name;
                fancyRender($scope, data.posts.data);
            });
        }

        function ProductionController($scope, categoryData, $translate, galleryInit) {
            console.log('ProductionController');
          var lang = $translate.use() === 'en' ? 'en/' : '';
          categoryData.pagesCategories().then(function(response) {
            var categories = response.pages.data.filter(function(page) {
              return page.slug === 'production';
            })[0].categories;
            $scope.subGalleries = categories.production.map(function (item) {
              item.link = lang + 'production/' + item.id;
              return item;
            });
            galleryInit('.gallery-cat .la-img');
          });
        }
      }]);
});
