'use strict';

angular.module('fredra.about', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/about', {
            templateUrl: 'js/about/index.html',
            controller: 'aboutController'
        });
    }])
    .controller('aboutController', ['$scope', 'fbPageData', function($scope, fbPageData) {

    // Defining user logged status
    $scope.logged = false;

    /**
     * Watch for Facebook to be ready.
     * There's also the event that could be used
     */
    $scope.$watch(
      function() {
        return fbPageData.isReady();
      },
      function(newVal) {
        if (newVal)
          $scope.facebookReady = true;
      }
    );

    if (fbPageData.isLogged()) {
      renderFBContent(fbPageData.getPageData());
    } else {
      fbPageData.setCallback(renderFBContent);
    }

    $scope.IntentLogin = function() {
      fbPageData.intentLogin();
    };
    $scope.user = {};




    function renderFBContent(data) {
      $scope.logged = true;
      $scope.about = data.about;
      $scope.description = data.description;
    }
    }]);