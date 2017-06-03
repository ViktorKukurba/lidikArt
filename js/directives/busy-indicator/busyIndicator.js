define([
  'angular'
], function(angular) {
  'use strict';
    var module = angular.module("rawAjaxBusyIndicator", []);

    module.directive("rawAjaxBusyIndicator", function () {
        return {
            link: function (scope, element) {
                scope.$on("ajax-start", function () {
                    $(element).css('opacity', 1);
                    setTimeout(function() {
                        $(element).show();
                    }, 500);

                });
                scope.$on("ajax-stop", function () {
                    $(element).css('opacity',0);
                    setTimeout(function() {
                        $(element).hide();
                    },500);
                });
            },
            templateUrl: require.toUrl('directives/busy-indicator/index.html')
        };
    });

    module.config(function ($httpProvider) {
        $httpProvider.interceptors.push(function ($q, $rootScope) {
            var requests = 0;

            function show() {
                if (!requests) {
                    $rootScope.$broadcast("ajax-start");
                }
                requests++;
            }

            function hide() {
                requests--;
                if (!requests) {
                    $rootScope.$broadcast("ajax-stop");
                }
            }

            return {
                'request': function (config) {
                    show();
                    return $q.when(config);
                }, 'response': function (response) {
                    hide();
                    return $q.when(response);
                }, 'responseError': function (rejection) {
                    hide();
                    return $q.reject(rejection);
                }
            };
        });
    });
});