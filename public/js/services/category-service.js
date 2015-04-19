//lidikArt.SERVICE_URL = 'http://localhost/lidik/public_html/';
lidikArt.SERVICE_URL = '../';

lidikArt.factory('categoryData', ['$http', function($http) {
    var url = lidikArt.SERVICE_URL + '?json_route=/taxonomies/category/terms';
    return $http.get(url);
}]);

lidikArt.factory('categoryPosts', ['$http', function($http) {
    var url = lidikArt.SERVICE_URL + '?json_route=/posts&filter[cat]=';
    return {
        getPosts: function(categoryId) {
            return $http.get(url + categoryId);
        }
    }
}]);
