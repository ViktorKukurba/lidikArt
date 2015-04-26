define([
  'angular',
  'services/category-service',
  'angular-translate',
  'angular-translate-loader-static'
], function(angular) {
  'use strict';

  angular.module('lidikArt.gallery', ['ui.router', 'pascalprecht.translate'])
    .config(['$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {

        $stateProvider
          .state('app.gallery', {
            templateUrl: 'js/gallery/index.html',
            url: '/gallery',
            controller: function ($scope, $location, Facebook, $stateParams, categoryData, $translate) {

              var lang = $translate.use() === 'en' ? 'en/' : '';

              categoryData.categories().success(function (data, status, headers, config) {
                var tabs = data.map(function (item) {
                  item.link = lang + 'gallery/' + item.ID;
                  return item;
                });
                tabViewHandler($scope, $location, tabs);
              });
              function tabViewHandler($scope, $location, tabs, cb) {
                $scope.tabs = tabs;

                $scope.setSelectedTab = function (tab) {
                  $scope.selectedTab = tab;
                  if (cb) {
                    cb();
                  }
                };

                var selectedTab = cb ? 0 : undefined;

                $scope.tabs.forEach(function (item, index) {
                  if ($location.path().indexOf(item.link.replace('#', '')) > -1) {
                    selectedTab = index;
                  }
                });

                if (!angular.isUndefined(selectedTab)) {
                  $scope.setSelectedTab($scope.tabs[selectedTab]);
                }

                $scope.tabClass = function (tab) {
                  if ($scope.selectedTab == tab) {
                    return "active";
                  } else {
                    return "";
                  }
                };
              }
            }
          })
          .state('app.album', {
            templateUrl: 'js/gallery/album.html',
            url: '/gallery/{album}',
            controller: function ($scope, $stateParams, categoryPosts, categoryData, $translate) {
              var lang = $translate.use() === 'en' ? 'en/' : '';
              categoryData.categories().success(function (data, status, headers, config) {

                $scope.categories = data.map(function (item) {
                  if (item.ID == $stateParams.album) {
                    $scope.category = item;
                  }
                  return {
                    link: lang + 'gallery/' + item.ID,
                    label: item.name,
                    name: item.ID
                  };
                });
                $scope.selectedCategory = function (cat) {
                  if (cat.name == $scope.category.ID) {
                    return 'active';
                  }
                };
              });

              categoryPosts.getPosts($stateParams.album).success(function (data, status, headers, config) {
                $scope.images = data.map(function (item) {
                  item.small = item.featured_image.attachment_meta.sizes['post-thumb'].url;
                  item.big = item.featured_image.guid;
                  return item;
                });

                setTimeout(function () {
                  $('.fancybox-buttons').fancybox({
                    openEffect: 'none',
                    closeEffect: 'none',

                    prevEffect: 'none',
                    nextEffect: 'none',

                    closeBtn: false,

                    helpers: {
                      title: {
                        type: 'inside'
                      },
                      buttons: {}
                    },

                    beforeShow: function () {

                      this.title = '<div class="fb-like-component">' +
                        '<div class="fb-like"' +
                        'data-href="' + this.href + '"' +
                        'data-layout="standard"' +
                        'data-action="like"' +
                        'data-show-faces="true"' +
                        //'data-width="200"' +
                        'data-share="true">' +
                        '</div>';
                    },
                    afterShow: function () {
                      FB.XFBML.parse(); // reparse the document
                      $.fancybox.update(); // resize after show (just in case)
                    }

//                              afterLoad : function() {
//                                  this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
//                              }
                  });
                }, 100);
              });
            }
          });
      }]);
});
