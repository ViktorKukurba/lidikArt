'use strict';

angular.module('fredra.contacts', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/contacts', {
            templateUrl: 'js/contacts/index.html',
            controller: 'contactsController'
        });
    }])
    .controller('contactsController', ['$scope','fbPageData', function($scope, fbPageData) {

    /**
     * Watch for Facebook to be ready.
     * There's also the event that could be used
     */
  $scope.$watch(
    function() {
      return fbPageData.isReady();
    },
    function(newVal) {
      if (newVal)
        $scope.facebookReady = true;
    }
  );

    if (fbPageData.isLogged()) {
      renderFBContent(fbPageData.getPageData());
    } else {
      fbPageData.setCallback(renderFBContent);
    }

    function renderFBContent(data) {
      $scope.logged = true;
      $scope.location = data.location;

      var mapCanvas = document.getElementById('map_canvas');
      var myLatlng = new google.maps.LatLng($scope.location.latitude, $scope.location.longitude);
      var mapOptions = {
        center: myLatlng,
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(mapCanvas, mapOptions);
      // To add the marker to the map, use the 'map' property
      var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title:"Fredra.61"
      });
    }

    $scope.IntentLogin = function() {
      fbPageData.intentLogin();
    };
    }]);