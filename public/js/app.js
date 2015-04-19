'use strict';
// Declare app level module which depends on views, and components
var lidikArt = angular.module('lidikArt', [ 'lidikArt.gallery',
      'lidikArt.about',
      'lidikArt.contacts',
      'facebook',
      'ui.router',
      'ngSanitize',
      'rawAjaxBusyIndicator'
    ])
    .config(function($stateProvider, $urlRouterProvider) {

      // For any unmatched url, send to /route1
      $urlRouterProvider.otherwise('/gallery');

    })
    .config([
      'FacebookProvider',
      function(FacebookProvider) {
        var myAppId = '380038068742752';
        FacebookProvider.init(myAppId);

      }
    ])
    .controller('NavigationCtrl', ['$scope', '$location', 'Facebook', 'categoryData', function($scope, $location, Facebook, categoryData) {
        console.log('test');

        categoryData.success(function(data, status, headers, config) {
            var tabs = [
                { link: '#/gallery', label: 'Gallery'},
                { link: '#/about', label: 'About' },
                { link: '#/contacts', label: 'Contacts' }
            ];


            tabs[0].subTabs = formatCategories(data);
            tabViewHandler($scope, $location, tabs);
            console.log('TEST-1');
        });
    }]);

function formatCategories(data) {
    return data.map(function(item) {
        console.log(item.name);
        return {
            link: '#/gallery/' + item.ID,
            label: item.name,
            name: item.ID
        }
    });
}

function tabViewHandler($scope, $location, tabs, cb) {
  $scope.tabs = tabs;

  $scope.setSelectedTab = function(tab) {
    $scope.selectedTab = tab;
    if (cb) {
      cb();
    }
  };

  var selectedTab = cb ? 0 : undefined;

  $scope.tabs.forEach(function(item, index) {
    if ($location.path().indexOf(item.link.replace('#', '')) > -1) {
      selectedTab = index;
    }
  });

  if (!angular.isUndefined(selectedTab)) {
    $scope.setSelectedTab($scope.tabs[selectedTab])
  }

  $scope.tabClass = function(tab) {
    if ($scope.selectedTab == tab) {
      return "active";
    } else {
      return "";
    }
  }
}