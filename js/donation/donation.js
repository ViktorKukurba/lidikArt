'use strict';

angular.module('fredra.donation', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/donation', {
            templateUrl: 'js/donation/index.html',
            controller: 'donationController'
        });
    }])
    .controller('donationController', ['$scope','$http', 'generateCode', 'pbRequestData', function($scope, $http, generateCode, pbRequestData) {
        document.querySelector('ul.nav li.active').className = '';
        document.querySelector('ul.nav a[href="#/donation"]').parentNode.className = 'active';
        $scope.pbOrder = generateCode.getCode();
        if (pbRequestData.isInit()) {
            var config = pbRequestData.getPbConfig();
            $scope.pbMerchant = config.merchant;
            $scope.pbDetails = config.details;
            $scope.return_url = config.return_url;
            $scope.pbExt_details = config.ext_details;
        } else {
            pbRequestData.setCallback(function(pdConfig){
                $scope.pbMerchant = pdConfig.merchant;
                $scope.pbDetails = pdConfig.details;
                $scope.return_url = pdConfig.return_url;
                $scope.pbExt_details = pdConfig.ext_details;
            });
        }

    }]).factory('generateCode', function() {
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        function generateCode(len){
            len = len || 8;
            var text = "";
            for( var i=0; i < len; i++ )
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }

        return {
            getCode: generateCode
        };
    }).factory('pbRequestData', ['$http', function($http) {
        var pbConfig,
            init = false,
            callback;
        $http.get('./pb-config.json').
            success(function(data, status, headers, config) {
                init = true;
                pbConfig = data;
                callback(data);
            });

        return {
            isInit: function() {
                return init
            },
            getPbConfig: function() {
                return pbConfig;
            },
            setCallback: function(cb){
                callback = cb;
            }
        };
    }]);

