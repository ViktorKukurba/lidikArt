define([
  'angular'
], function(angular) {

  function formatCategories(data) {
    return data.map(function (item) {
      return {
        link: '#/gallery/' + item.ID,
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
        controller: ['$scope', '$location', '$compile', 'categoryData',
          function($scope, $location, $compile, categoryData) {
            categoryData.success(function (data, status, headers, config) {
              var tabs = [
                { link: '#/gallery', label: 'Gallery'},
                { link: '#/about', label: 'About' },
                { link: '#/contacts', label: 'Contacts' }
              ];


              tabs[0].subTabs = formatCategories(data);
              var df = $('#donation-form');
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
