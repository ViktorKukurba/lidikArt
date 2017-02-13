define([
  'angular',
  'services/category-service',
  'angular-translate',
  'angular-translate-loader-static',
  'angular-easyfb',
   ''
], function(angular) {
  'use strict';
  angular.module('lidikArt.production', ['ezfb'])
    .config(['$stateProvider',
      function ($stateProvider) {
        $stateProvider.
            state('app.production', {
            templateUrl: window.globalConfig.path + 'js/gallery/index.html',
            //url: '/gallery/{type:art|production}',
            url: '/production',
            controller: function ($scope, $location, $stateParams, categoryData, $translate) {
              var lang = $translate.use() === 'en' ? 'en/' : '';
              categoryData.pagesCategories().then(function(response) {
                var categories = response.pages.data.filter(function(page) {
                  return page.slug === 'production';
                })[0].categories;
                $scope.subGalleries = categories.map(function (item) {
                  //item.link = lang + item.parent.slug + '/' + item.ID;
                  item.link = lang + 'production/' + item.id;

                  return item;
                });
                galleryInit();

              });
            }
          });

        function galleryInit() {
          setTimeout(function() {
            $('.gallery-cat .la-img').each(function(index, wrap) {
              var img = document.createElement('IMG');
              var $wrap = $(wrap);
              img.src = $wrap.data('image');
              if (img.complite) {
                $wrap.css('background-image', 'url(' + img.src + ')');
                $wrap.addClass('loaded');
              } else {
                img.onload = function() {
                  $wrap.css('background-image', 'url(' + img.src + ')');
                  $wrap.addClass('loaded');
                };

                if (img.complite) {
                  $wrap.css('background-image', 'url(' + img.src + ')');
                  $wrap.addClass('loaded');
                }
              }
            });
          }, 100);
        }
      }]);
});
