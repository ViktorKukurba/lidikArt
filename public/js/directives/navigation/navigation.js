define([
  'angular'
], function(angular) {

  function formatCategories(data, lang) {
    return data.map(function (item) {
      return {
        link: lang + 'gallery/' + item.ID,
        label: item.name,
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
            categoryData.categories().success(function (data, status, headers, config) {

              var lang = $translate.use() === 'en' ? 'en/' : '';

              var tabs = [
                { link: lang + 'gallery', label: 'Gallery'},
                { link: lang + 'about', label: 'About' },
                { link: lang + 'contacts', label: 'Contacts' }
              ];


              tabs[0].subTabs = formatCategories(data, lang);
              $scope.tabs = tabs;

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
