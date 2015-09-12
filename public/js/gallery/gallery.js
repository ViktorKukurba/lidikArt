define([
  'angular',
  'services/category-service',
  'angular-translate',
  'angular-translate-loader-static',
  'fancybox-thumbs',
  'fancybox-buttons'
], function(angular) {
  'use strict';

  angular.module('lidikArt.gallery', ['ui.router', 'pascalprecht.translate'])
    .config(['$stateProvider',
      function ($stateProvider) {

        $stateProvider
          .state('app.gallery', {
            templateUrl: 'js/gallery/index.html',
            url: '/gallery',
            controller: function ($scope, $location, Facebook, $stateParams, categoryData, $translate) {
              var lang = $translate.use() === 'en' ? 'en/' : '';

              categoryData.categories().success(function (data, status, headers, config) {
                $scope.subGalleries = data.map(function (item) {
                  item.link = lang + 'gallery/' + item.ID;
                  return item;
                });
              });
            }
          });
      }]);
});
