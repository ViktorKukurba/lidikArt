'use strict';

angular.module('fredra.contacts', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/contacts', {
            templateUrl: 'js/contacts/index.html',
            controller: 'contactsController'
        });
    }])
    .controller('contactsController', ['$scope','$http', function() {
    }]);