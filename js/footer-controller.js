define([
    'app'
], function(app) {
  app.controller('FooterCtrl', ['$scope', '$translate', 'categoryData',
    function($scope, $translate, categoryData) {
      categoryData.pagesCategories().then(function(data) {
        //$scope.art = data.pagesCategories.art;
        $scope.production = data.pagesCategories.filter(function(page) {
          return page.slug === 'production';
        })[0].categories;
         //data.groupedData['10'];
      });
    }]);
});