define([
  'angular',
  'gallery/gallery'
], function(angular) {
  angular.module('lidikArt.gallery')
    .config(function ($stateProvider) {
      $stateProvider.state('app.album', {
        templateUrl: 'js/gallery/album.html',
        url: '/gallery/{album}',
        controller: function ($scope, $stateParams, categoryPosts, $location) {
          var clearLocation = function () {
            var uri = window.location.toString();

            if (uri.indexOf("?") > 0) {
              var clean_uri = uri.substring(0, uri.indexOf("?"));
              window.history.replaceState({}, document.title, clean_uri);
            }
            $location.search('pic', null);
          };

          var setQueryParam = function(param, val) {
            var clean_uri = location.href;

            if (clean_uri.indexOf("?") > 0) {
              clean_uri = clean_uri.substring(0, clean_uri.indexOf("?"));
            }

            var obj = {};
            obj[param] = val;
            var url = clean_uri + '?' + $.param(obj);

            window.history.replaceState(obj, document.title, url);
          };

          //var lang = $translate.use() === 'en' ? 'en/' : '';
          //categoryData.categories().success(function (data, status, headers, config) {
          //  $scope.categories = data.map(function (item) {
          //    if (item.ID == $stateParams.album) {
          //      $scope.category = item;
          //    }
          //    return {
          //      link: lang + 'gallery/' + item.ID,
          //      label: item.name,
          //      name: item.ID
          //    };
          //  });
          //});

          categoryPosts.getPosts($stateParams.album).success(function (data, status, headers, config) {
            $scope.images = data.filter(function(item){
              return !!item.featured_image.attachment_meta;
            }).map(function (item) {
              if (item.featured_image.attachment_meta) {
                item.small = item.featured_image.attachment_meta.sizes['post-thumb'].url;
                item.big = item.featured_image.guid;
                return item;
              }
            });

            //window.ll = $location;



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
                    width	: 100,
                    height	: 75
                  },
                  buttons: {}
                },

                beforeShow: function () {
                  var image = this.element.find('img')[0];
                  setQueryParam('pic', image.id);

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
                  var $image =
                  $('.fancybox-image')
                      .wrap('<span style="display:inline-block"></span>')
                      .css('display', 'block')
                      .parent();

                  $image.zoom({
                    url: $image.attr('src'),
                    duration: 200,
                    magnify: 0.4
                  });
                },

                afterClose : function() {
                  //console.log($location.search(), 'null');
                  //$location.url($location.path());
                  //$location.search('pic', 'test');
                  clearLocation();

                }

//                              afterLoad : function() {
//                                  this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
//                              }
              });

              var pictureId = $location.search().pic;
              if (pictureId) {
                $('#' + pictureId).click();
              }

            }, 1e2);
          });
        }
      });
    });

});
