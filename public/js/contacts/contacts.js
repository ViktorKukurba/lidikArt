define([
  'angular',
  'services/contacts-service'
], function(angular) {
  'use strict';

  angular.module('lidikArt.contacts', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider',
      function ($stateProvider) {
        $stateProvider
          .state('contacts', {
            templateUrl: 'js/contacts/index.html',
            url: '/contacts',
            controller: function ($scope, contactsData) {
              $scope.contact = contactsData.data;
            }
          });
      }
    ]);
});
