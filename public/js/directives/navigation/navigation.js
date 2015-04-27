define([
  'angular'
], function(angular) {

  function formatCategories(data, lang) {
    return data.map(function (item) {
      return {
        link: lang + 'gallery/' + item.ID,
        title: item.name,
        name: item.ID
      };
    });
  }

  return angular.module('navigation', [])
    .directive('navigation', function($timeout) {
      return {
        compile: function compile() {
          var selected;
          return {
            pre: function(scope, element) {
              var $element = $(element);

            }
          };
        },
        templateUrl: 'js/directives/navigation/index.html',
        restrict: 'AE',
        scope: true,
        controller: ['$scope', '$location', '$compile', 'categoryData', '$translate',
          function($scope, $location, $compile, categoryData, $translate) {
            //categoryData.categories().success(function (data, status, headers, config) {
            categoryData.data().then(function(values) {

              var lang = $translate.use() === 'en' ? 'en/' : '';

              values.pages.data.sort(function(a, b) {
                return a.menu_order - b.menu_order;
              });

              values.pages.data.forEach(function(item) {
                item.link = lang + item.name;
                if ('gallery' === item.name) {
                  item.subTabs = formatCategories(values.categories.data, lang);
                }
              });

              $scope.tabs = values.pages.data;

              $scope.setSelectedTab = function (tab) {
                $scope.selectedTab = tab;
              };

              var selectedTab = 0;

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
            });
          }]
      };
    });
});
