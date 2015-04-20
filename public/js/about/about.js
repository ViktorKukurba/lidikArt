define([
  'angular',
  'services/category-service'
], function(angular) {
  'use strict';
  angular.module('lidikArt.about', ['ui.router'])
    .config(['$stateProvider',
      function ($stateProvider) {
        $stateProvider
          .state('about', {
            templateUrl: 'js/about/index.html',
            url: '/about',
            controller: function ($scope, lidikInfo) {

              // Defining user logged status
              lidikInfo.success(function (data) {
                $scope.title = data[0].title;
                $scope.content = data[0].content;
              });
            }
          })
      }]);
});
