'use strict';

angular.module('fredra.about', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/about', {
            templateUrl: 'js/about/index.html',
            controller: 'aboutController'
        });
    }])
    .controller('aboutController', ['$scope','$http', function() {
    }]);