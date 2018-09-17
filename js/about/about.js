define([
  'angular',
  'services/lidikInfo-service',
  'services/utils-service'
], function(angular) {
  'use strict';
  angular.module('lidikArt.about', ['ui.router', 'ngSanitize', 'services'])
    .config(['stateManagerProvider',
      function (stateManagerProvider) {
        function getSourceUrl(item) {
          try {
            return item.better_featured_image.media_details.sizes.thumbnail.source_url;
          } catch(e) {
            return false;
          }
        }
        var about = {
          name: 'app.about',
          templateUrl: require.toUrl('about/index.html'),
          url: '/about',
          controller: function ($scope, lidikInfo, $sce, $translate) {
            $scope.fbHref = location.href;
            // Defining user logged status
            lidikInfo.then(function (data) {
              var aboutPage = data.data.filter(function(page) {
                return page.slug === 'about';
              })[0];
              $scope.title = aboutPage.title;
              $scope.image = getSourceUrl(aboutPage);
              $scope.content = $sce.trustAsHtml(aboutPage.content.rendered); //;
              $scope.resume = {
                link: require.toUrl('../documents/' + $translate.use() + '-resume.pdf'),
                name: 'pages.resume.action'
              };
            });
          }
        };
        stateManagerProvider.register(about);
      }]);
});
