define([
  'angular',
  'services/lidikInfo-service'
], function(angular) {
  'use strict';
  angular.module('lidikArt.about', ['ui.router', 'ngSanitize'])
    .config(['$stateProvider',
      function ($stateProvider) {
        var about = {
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
              $scope.image = aboutPage.better_featured_image.media_details.sizes.thumbnail.source_url.
                replace('https', 'http');
              $scope.content = $sce.trustAsHtml(aboutPage.content.rendered); //;
              $scope.resume = {
                link: require.toUrl('../documents/' + $translate.use() + '-resume.pdf'),
                name: 'pages.resume.action'
              };
            });
          }
        };

        var enAbout = Object.create(about);
        enAbout.url = '/en/about';

        $stateProvider.state('app.about', about);
        $stateProvider.state('app.enAbout', enAbout);
      }]);
});