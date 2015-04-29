define([
    'app'
], function(app) {
  app.controller('FooterCtrl', ['$scope', '$translate', 'categoryData',
    function($scope, $translate, categoryData) {
      categoryData.categories().then(function(data) {
        $scope.gallery = data.data;
      });
    }]);
});