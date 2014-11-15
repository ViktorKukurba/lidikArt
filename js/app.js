
    'use strict';
    // Declare app level module which depends on views, and components
    var fredra = angular.module('fredra', [
        'ngRoute',
        'fredra.about',
        'fredra.donation',
        'fredra.contacts'
    ]).
        config(['$routeProvider', function($routeProvider) {
            $routeProvider.otherwise({redirectTo: '/about'});
        }]).controller('NavigationCtrl', ['$scope', '$location', function($scope, $location) {
          var tabs = [
            { link : '#/donation', label : 'Підтримка' },
            { link : '#/about', label : 'Про нас' },
            { link : '#/contacts', label : 'Контакти' }
          ];
          tabViewHandler($scope, $location, tabs);
      }]);

    function tabViewHandler($scope, $location, tabs) {
      $scope.tabs = tabs;

      var selectedTab;

      $scope.tabs.forEach(function(item, index) {
        if ($location.path().indexOf(item.link.replace('#', '')) > -1) {
          selectedTab = index;
        }
      });

      if (!angular.isUndefined(selectedTab)){
        $scope.selectedTab = $scope.tabs[selectedTab];
      }

      $scope.setSelectedTab = function(tab) {
        $scope.selectedTab = tab;
      };

      $scope.tabClass = function(tab) {
        if ($scope.selectedTab == tab) {
          return "active";
        } else {
          return "";
        }
      }
    }