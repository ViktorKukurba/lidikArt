define(['angular'], function(angular) {
  angular.module('lidikArt').factory('fancyboxService',
      ['translator', '$location', 'ezfb', function(translator, $location, ezfb) {
        return function() {
          var isMobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
          var clearLocation = function() {
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

          $('body').on('click', '.fb-custom-share-button', function(evt) {
            ezfb.ui(
                {
                  method: 'feed',
                  name: 'LidikArt Picture',
                  picture: $(evt.target).data('picture'),
                  link: window.location.toString(),
                  description: $(evt.target).data('description')
                },
                null
            );
          });

          setTimeout(function() {
            var fancyAlbum = $('.fancybox-thumb').fancybox({
              closeBtn: true,
              openEffect  : 'elastic',
              closeEffect : 'elastic',
              helpers: {
                title: {
                  type: 'inside'
                },
                thumbs: {
                  width: 100,
                  height: 75
                }
                //buttons: {}
              },
              showNavArrows : true,

              beforeShow: function() {
                var image = this.element.find('img')[0];
                setQueryParam('pic', image.id);
                this.title = '<div class="img-title">' + translator.translate(this.title) + '</div>' +
                '<div class="fb-like" data-image="http://lidikart.com.ua/wp-content/uploads/2016/01/DSC_0020_mini-225x158.jpg" data-layout="button_count" data-action="like" data-show-faces="true" data-share="false" data-href="' + location.href + '"></div>' +
                '<span class="fb-custom-share-button" data-description="' + translator.translate(this.title) + '" data-picture="' + image.src + '">share</span>';
                var etsyId = this.element.data('etsy');
                if (etsyId) {
                  this.title += '<a class="etsy-buy" href="https://www.etsy.com/listing/' + etsyId + '" target="_blank"><span></span></a>';
                }
                //'<div class="fb-share-button" onrender="rendered()" data-href="' + location.href + '" data-type="button_count" data-picture="http://lidikart.com.ua/wp-content/uploads/2014/06/cosmic-flowers.jpg"></div>';
              },
              afterShow: function() {
                ezfb.XFBML.parse();

                if (isMobile) {
                  $(document.body).on('swipeleft', $.fancybox.next);
                  $(document.body).on('swiperight', $.fancybox.prev);
                } else {
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
                }

              },
              afterClose: function() {
                clearLocation();
                if (isMobile) {
                  $(document.body).off('swipeleft', $.fancybox.next);
                  $(document.body).off('swiperight', $.fancybox.prev);
                }
              }
            });
            fancyAlbum.click(function(e) {
              e.preventDefault();
            });

            var pictureId = $location.search().pic;
            if (pictureId) {
              $('#' + pictureId).click();
            }
          }, 1e2);
        };
      }]);
});