
lidikArt.factory('lidikInfo', ['$http', function($http) {
    var url = lidikArt.SERVICE_URL + '?json_route=/pages';
    return $http.get(url);
}]);