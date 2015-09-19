define([
  'angular',
  'services/lidikInfo-service'
], function(angular) {
  'use strict';
  angular.module('lidikArt.about', ['ui.router', 'ngSanitize'])
    .config(['$stateProvider',
      function ($stateProvider) {
        $stateProvider
          .state('app.about', {
            templateUrl: 'js/about/index.html',
            url: '/about',
            controller: function ($scope, lidikInfo, $sce) {
              // Defining user logged status
              lidikInfo.success(function (data) {
                $scope.title = data[2].title;
                $scope.content = $sce.trustAsHtml(data[2].content); //;
              });
            }
          });
      }]);
});
