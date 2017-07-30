define([
    'angular',
    'services/fancybox-service',
  'services/utils-service'
], function(angular) {
    angular.module('lidikArt.exhibitions', ['ui.router', 'ngSanitize', 'services'])
        .config(['stateManagerProvider',
            function (stateManagerProvider) {
              function ExhibitionController($scope, $stateParams, categoryPosts, fancyRender, translator) {
                categoryPosts.getCategoryData($stateParams.album).then(function(data, status, headers, config) {
                  data.category.data.description = translator.translate(data.category.data.description);
                  $scope.exhibition = data.category.data;
                  fancyRender($scope, data.posts.data.reverse());
                  $scope.firstImages = $scope.images.filter(function(item, index) { return index < 6;  });
                  $scope.bottomImages = $scope.images.filter(function(item, index) { return index >= 6;  });
                });
              }

              function ExhibitionsController($scope, categoryData, $translate, galleryInit) {
                var lang = $translate.use() === 'en' ? 'en/' : '';
                categoryData.pagesCategories().then(function(response) {
                  var categories = response.pages.data.filter(function(page) {
                    return page.slug === 'exhibitions';
                  })[0].categories;
                  $scope.exhibitions = categories.exhibitions.map(function(item) {
                    item.link = lang + 'exhibitions/' + item.id;
                    return item;
                  });
                  galleryInit('.exhibition-image .la-img');
                });
              }

              var exhibition = {
                name: 'app.exhibitions',
                url: '/exhibitions',
                template: '<ui-view/>',
                abstract: true,
                controller: ExhibitionsController
              };

              var exhibitionDefault = {
                name: 'app.exhibitions.default',
                templateUrl: require.toUrl('exhibitions/index.html'),
                url: '',
                controller: function(galleryInit) {
                  galleryInit('.exhibition-image .la-img');
                }
              };

              var exhibitionView = {
                name: 'app.exhibitions.view',
                templateUrl: require.toUrl('exhibitions/exhibition.html'),
                url: '/{album}',
                controller: ExhibitionController
              };

              var exhibitionViewPicture = {
                name: 'app.exhibitions.view.picture',
                url: '/{id:pic-[0-9]{1,}}'
              };

              stateManagerProvider.register(
                  exhibition,
                  exhibitionDefault,
                  exhibitionView,
                  exhibitionViewPicture
              );
            }]);
});
