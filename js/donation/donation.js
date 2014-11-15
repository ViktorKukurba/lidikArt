'use strict';

angular.module('fredra.donation', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/donation/:service?', {
            templateUrl: 'js/donation/index.html',
            controller: 'donationController'
        });
    }])
    .controller('donationController', ['$scope', '$location', '$routeParams', '$compile', '$templateCache', function($scope, $location, $routeParams, $compile,  $templateCache ) {

    var tabs = [
      { link : '#/donation/privatbank', label : 'Приватбанк', name: 'privatbank' },
      { link : '#/donation/moneyua', label : 'Money UA', name: 'moneyua' },
      { link : '#/donation/easypayua', label : 'Easypay UA', name: 'easypayua' }
    ];

    tabViewHandler($scope, $location, tabs);

    var formTemplate = $templateCache.get($routeParams.service + '-form');
    $('#donation-container')
      .html('')
      .append($compile(formTemplate)($scope));
    }]).controller('privatbankController', ['$scope', 'generateCode', 'pbRequestData', function($scope, generateCode, pbRequestData) {
    $scope.pbOrder = generateCode.getCode();
    if (pbRequestData.isInit()) {
      var config = pbRequestData.getPbConfig();
      $scope.pbMerchant = config.merchant;
      $scope.pbDetails = config.details;
      $scope.return_url = config.return_url;
      $scope.pbExt_details = config.ext_details;
      $scope.defaultAmount = config.defaultAmount;
    } else {
      pbRequestData.setCallback(function(pdConfig){
        $scope.pbMerchant = pdConfig.merchant;
        $scope.pbDetails = pdConfig.details;
        $scope.return_url = pdConfig.return_url;
        $scope.pbExt_details = pdConfig.ext_details;
        $scope.defaultAmount = pdConfig.defaultAmount;
      });
    }
  }]).controller('moneyuaController', [function(){

  }]).controller('easypayuaController', [function(){

  }]);
