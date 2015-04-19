define([
  'angular'
], function(angular) {
  'use strict';
  angular.module('lidikArt.gallery', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('gallery', {
            templateUrl: 'js/gallery/index.html',
            url: '/gallery',
            controller: function ($scope, $location, Facebook, $stateParams, categoryData) {
              categoryData.success(function (data, status, headers, config) {
                var tabs = data.map(function (item) {
                  console.log(item);
                  //item.image = 'http://localhost/lidik/public_html/wp-content/uploads/2014/05/20140312_1258434-990x525.jpg';
                  item.link = '#/gallery/' + item.ID;
                  return item;
                });
                tabViewHandler($scope, $location, tabs);
              });
            }
          })
          .state('album', {
            templateUrl: 'js/gallery/album.html',
            url: '/gallery/{album}',
            controller: function ($scope, $stateParams, categoryPosts, categoryData) {
              categoryData.success(function (data, status, headers, config) {
                $scope.categories = data.map(function (item) {
                  console.log(item, $stateParams.album);
                  if (item.ID == $stateParams.album) {
                    console.log(item);
                    $scope.category = item;
                  }
                  return {
                    link: '#/gallery/' + item.ID,
                    label: item.name,
                    name: item.ID
                  }
                });
                $scope.selectedCategory = function (cat) {
                  if (cat.name == $scope.category.ID) {
                    return 'active';
                  }
                };
              });

              categoryPosts.getPosts($stateParams.album).success(function (data, status, headers, config) {
                $scope.images = data.map(function (item) {
                  console.log(item);
                  item.small = item.featured_image.attachment_meta.sizes['post-thumb'].url,
                    item.big = item.featured_image.guid
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
