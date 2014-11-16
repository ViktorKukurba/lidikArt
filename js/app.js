
    'use strict';
    // Declare app level module which depends on views, and components
    var fredra = angular.module('fredra', [
        'ngRoute',
        'fredra.about',
        'fredra.donation',
        'fredra.contacts',
        'facebook'
    ]).
        config(['$routeProvider', function($routeProvider) {
            $routeProvider.otherwise({redirectTo: '/donation'});
        }]).config([
        'FacebookProvider',
        function(FacebookProvider) {
          var myAppId = '380038068742752';
          FacebookProvider.init(myAppId);

        }
      ]).controller('NavigationCtrl', ['$scope', '$location', 'Facebook', function($scope, $location, Facebook) {
          var tabs = [
            { link : '#/donation', label : 'Підтримка' },
            { link : '#/about', label : 'Про нас' },
            { link : '#/contacts', label : 'Контакти' }
          ];
          tabViewHandler($scope, $location, tabs, function() {
            $('.jumbotron').addClass('animated fadeIn');
            setTimeout(function() {
                  $('.jumbotron').removeClass('animated fadeIn');
                 Facebook.parseXFBML(document.querySelector('.fb-like-component'));
              }, 700);
          });
      }]);

    function tabViewHandler($scope, $location, tabs, cb) {
      $scope.tabs = tabs;

      $scope.setSelectedTab = function(tab) {
        $scope.selectedTab = tab;
        if(cb) {
          cb();
        }
      };

      var selectedTab = cb? 0: undefined;

      $scope.tabs.forEach(function(item, index) {
        if ($location.path().indexOf(item.link.replace('#', '')) > -1) {
          selectedTab = index;
        }
      });

      if (!angular.isUndefined(selectedTab)){
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