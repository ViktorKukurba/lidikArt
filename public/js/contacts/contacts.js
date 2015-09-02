define([
  'angular',
  'services/contacts-service'
], function(angular) {
  'use strict';

  angular.module('lidikArt.contacts', ['ui.router'])
    .config(['$stateProvider',
      function ($stateProvider) {
        $stateProvider
          .state('app.contacts', {
            templateUrl: 'js/contacts/index.html',
            url: '/contacts',
            controller: function ($scope, contactsData) {
              $scope.contact = contactsData.data;
            }
          });
      }
    ]);
});
