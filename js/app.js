
    'use strict';
    // Declare app level module which depends on views, and components
    angular.module('fredra', [
        'ngRoute',
        'fredra.about',
        'fredra.donation',
        'fredra.contacts'
    ]).
        config(['$routeProvider', function($routeProvider) {
            $routeProvider.otherwise({redirectTo: '/about'});
        }]);