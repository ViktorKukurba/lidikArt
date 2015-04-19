/*!
 *
 * main.js
 * LidikArt web application.
 * http://lidikart.com.ua
 *
 *
 * Copyright 2015, Viktor Kukurba
 * @author: Viktor Kukurba
 * License: MIT
 *
 */
require.config({
  baseUrl: 'js',
  paths: {
    angular: '../bower_components/angular/angular.min',
    'angular-route': '../bower_components/angular-route/angular-route.min',
    'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router.min',
    fancybox: '../bower_components/fancybox/source/jquery.fancybox',
    'fancybox-buttons': '../bower_components/fancybox/source/helpers/fancybox-buttons',
    jquery: '../bower_components/jquery/dist/jquery.min',
    'jquery-mousewheel': '../bower_components/jquery-mousewheel/jquery-mousewheel.min',
    wow: '../bower_components/wow/dist/wow.min'
  },
  shim: {
    angular: {
      exports: 'angular'
    },
    'angular-ui-router': {
      deps: ['angular']
    },
    'fancybox': {
      deps: ['jquery']
    }
  }
});
require([
  'angular',
  'app',
  'jquery',
  'angular-ui-router',
  'fancybox'
], function(angular, app) {
  app.config(function ($stateProvider, $urlRouterProvider) {

    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise('/gallery');

  })
    .config([
      'FacebookProvider',
      function (FacebookProvider) {
        var myAppId = '380038068742752';
        FacebookProvider.init(myAppId);

      }
    ])
    .controller('NavigationCtrl', ['$scope', '$location', 'Facebook', 'categoryData', function ($scope, $location, Facebook, categoryData) {
      categoryData.success(function (data, status, headers, config) {
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
    return data.map(function (item) {
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
      $scope.setSelectedTab($scope.tabs[selectedTab])
    }

    $scope.tabClass = function (tab) {
      if ($scope.selectedTab == tab) {
        return "active";
      } else {
        return "";
      }
    }
  }
  angular.bootstrap(document, ['lidikArt']);
});
