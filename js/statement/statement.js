define([
  'angular',
  'angular-translate',
  'angular-translate-loader-static'
], function(angular) {
  'use strict';
  angular.module('lidikArt.statement', ['ui.router', 'ngSanitize'])
      .config(['$stateProvider',
        function ($stateProvider) {
          $stateProvider
              .state('app.statement', {
                templateUrl: window.globalConfig.path + 'js/statement/index.html',
                url: '/statement',
                controller: function ($scope, lidikInfo, $sce) {
                  lidikInfo.then(function (data) {
                    var statementPage = data.data.filter(function(page) {
                      return page.slug === 'statement';
                    })[0];
                    $scope.title = statementPage.title;
                    $scope.content = $sce.trustAsHtml(statementPage.content.rendered);
                  });
                }
              });
        }]);
});