define([
  'angular',
  'gallery/gallery'
], function(angular) {
  angular.module('lidikArt.gallery')
    .config(function ($stateProvider) {
      $stateProvider.state('app.album', {
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
            $scope.images = data.filter(function(item){
              return !!item.featured_image.attachment_meta;
            }).map(function (item) {
              if (item.featured_image.attachment_meta) {
                item.small = item.featured_image.attachment_meta.sizes['post-thumb'].url;
                item.big = item.featured_image.guid;
                return item;
              } else {
                console.log('fea', item);
              }

            });

            setTimeout(function () {
              $('.fancybox-thumb').fancybox({
                //openEffect: 'none',
                //closeEffect: 'none',
                //
                //prevEffect: 'none',
                //nextEffect: 'none',

                closeBtn: false,

                helpers: {
                  title: {
                    type: 'inside'
                  },
                  thumbs	: {
                    width	: 75,
                    height	: 50
                  },
                  buttons: {}
                },

                beforeShow: function () {

                  this.title = '<div class="img-title">' + this.title + '</div>' +
                    '<div class="fb-like-component">' +
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
    });

});
