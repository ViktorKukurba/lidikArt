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
    .config(['$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {

        $stateProvider
          .state('app.gallery', {
            templateUrl: 'js/gallery/index.html',
            url: '/gallery',
            controller: function ($scope, $location, Facebook, $stateParams, categoryData, $translate) {

              var lang = $translate.use() === 'en' ? 'en/' : '';

              categoryData.categories().success(function (data, status, headers, config) {
                console.log(data);
                var tabs = data.map(function (item) {
                  item.link = lang + 'gallery/' + item.ID;
                  return item;
                });
                tabViewHandler($scope, $location, tabs);
              });
              function tabViewHandler($scope, $location, tabs, cb) {
                $scope.tabs = tabs;

                $scope.setSelectedTab = function (tab) {
                  $scope.selectedTab = tab;
                  if (cb) {
                    cb();
                  }
                };

                var selectedTab = cb ? 0 : undefined;

                $scope.tabs.forEach(function (item, index) {
                  if ($location.path().indexOf(item.link.replace('#', '')) > -1) {
                    selectedTab = index;
                  }
                });

                if (!angular.isUndefined(selectedTab)) {
                  $scope.setSelectedTab($scope.tabs[selectedTab]);
                }

                $scope.tabClass = function (tab) {
                  if ($scope.selectedTab == tab) {
                    return "active";
                  } else {
                    return "";
                  }
                };
              }
            }
          });
      }]);
});
