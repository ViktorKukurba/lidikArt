'use strict';

angular.module('fredra.donation', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('donation', {
              templateUrl: 'js/donation/index.html',
              url: '/donation',
              controller: function($scope, $location, Facebook) {
                var tabs = [
                  {
                    link: '#/donation/privatbank',
                    label: 'Приватбанк',
                    name: 'privatbank'
                  },
                  {
                    link: '#/donation/moneyua',
                    label: 'Money UA',
                    name: 'moneyua'
                  },
                  {
                    link: '#/donation/easypayua',
                    label: 'Easypay UA',
                    name: 'easypayua'
                  }
                ];

                tabViewHandler($scope, $location, tabs);
              }
            })
            .state('donation.privatbank', {
              templateUrl: 'js/donation/privatbank-form.html',
              url: '/privatbank',
              controller: function($scope, generateCode, pbRequestData) {
                $scope.pbOrder = generateCode.getCode();
                if (pbRequestData.isInit()) {
                  var config = pbRequestData.getPbConfig();
                  setData(config);
                } else {
                  pbRequestData.setCallback(function(config) {
                    setData(config);
                  });
                }
                function setData(config) {
                  $scope.pbMerchant = config.merchant;
                  $scope.pbDetails = config.details;
                  $scope.return_url = config.return_url;
                  $scope.pbExt_details = config.ext_details;
                  $scope.defaultAmount = config.defaultAmount;
                }
              }
            }).state('donation.moneyua', {
              templateUrl: 'js/donation/moneyua-form.html',
              url: '/moneyua',
              controller: function($scope, moneyuaRequestData) {
                if (moneyuaRequestData.isInit()) {
                  var config = moneyuaRequestData.getPbConfig();
                  setData(config);
                } else {
                  moneyuaRequestData.setCallback(function(config) {
                    setData(config);
                  });
                }
                function setData(config) {
                  $scope.step = config.step;
                  $scope.okpo = config.okpo;
                  $scope.acc = config.acc;
                  $scope.name = config.name;
                  $scope.defaultAmount = config.defaultAmount;
                  $scope.mfo = config.mfo;
                  $scope.info = config.info;
                }
              }
            }).state('donation.easypayua', {
              templateUrl: 'js/donation/easypayua-form.html',
              url: '/easypayua',
              controller: function() {
              }
            });
      }]);

