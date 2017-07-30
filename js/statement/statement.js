define([
  'angular',
  'angular-translate',
  'angular-translate-loader-static',
  'services/utils-service'
], function(angular) {
  'use strict';
  angular.module('lidikArt.statement', ['ui.router', 'ngSanitize', 'services'])
      .config(['stateManagerProvider', function(stateManagerProvider) {
        var statement = {
          name: 'app.statement',
          templateUrl: require.toUrl('statement/index.html'),
          url: '/statement',
          controller: function($scope, lidikInfo, $sce) {
            lidikInfo.then(function(data) {
              var statementPage = data.data.filter(function(page) {
                return page.slug === 'statement';
              })[0];
              $scope.title = statementPage.title;
              $scope.content = $sce.trustAsHtml(statementPage.content.rendered);
            });
          }
        };
        stateManagerProvider.register(statement);
      }]);
});