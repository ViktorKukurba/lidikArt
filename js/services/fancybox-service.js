define([
  'angular',
  'fancybox'], function(angular, fancybox) {
    $.fancybox.defaults.history = true;
    $.fancybox.defaults.hash = false;
    angular.module('lidikArt').factory('fancyboxService',
        ['translator', '$location', 'ezfb', function (translator, $location, ezfb) {
            return function (opt_config) {
                opt_config = opt_config || {};
                var isMobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
                var clearLocation = function () {
                    var uri = window.location.toString();

                    if (uri.indexOf("?") > 0) {
                        var clean_uri = uri.substring(0, uri.indexOf("?"));
                        window.history.replaceState({}, document.title, clean_uri);
                    }
                    $location.search('pic', null);
                };

                $('body').on('click', '.fb-custom-share-button', function (evt) {
                    evt.stopImmediatePropagation();
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

                var defaultConfig = {
                    openEffect: 'elastic',
                    closeEffect: 'elastic',
                    thumbs: {
                        autoStart: true, // Display thumbnails on opening
                    },
                    touch: true,
                    slideShow: true,
                    closeBtn: true,
                    fullScreen: {
                        requestOnStart: false // Request fullscreen mode on opening
                    },
                    caption: function (instance, item) {
                        if (item.type === 'image') {
                            var title = translator.translate($(this).attr('title'));
                            var likeUrl = '/' + instance.opts.hash + '/' + item.opts.$thumb[0].id.replace(instance.opts.hash + '-', '');
                            return '<div class="img-title">' + title + '</div>' +
                                '<div class="facebook-block"><div class="fb-like" data-image="http://lidikart.com.ua/wp-content/uploads/2016/01/DSC_0020_mini-225x158.jpg" data-layout="button_count" data-action="like" data-show-faces="true" data-share="false" data-href="' + likeUrl + '"></div>' +
                                '<span class="fb-custom-share-button" data-description="' + title + '" data-picture="' + item.src + '">share</span></div>';
                        }
                    },

                    beforeLoad: function () {
                        ezfb.XFBML.parse();
                    },

                    afterClose: function () {
                        clearLocation();
                        if (isMobile) {
                            $(document.body).off('swipeleft', $.fancybox.next);
                            $(document.body).off('swiperight', $.fancybox.prev);
                        }
                    },
                    history: true
                };

                setTimeout(function () {
                    $.fancybox.getInstance();
                    var fancyAlbum = $('.fancybox-thumb').fancybox($.extend(defaultConfig, opt_config));
                    $.fancybox.triggerFromUrl();
                }, 1e2);
            };
        }]).factory('galleryInit', [function () {
        function galleryInit(images) {
            setTimeout(function () {
                if (typeof images === 'string') {
                    images = $(images);
                }
                images.each(function (index, wrap) {
                    var img = document.createElement('IMG');
                    var $wrap = $(wrap);
                    img.src = $wrap.data('image');
                    if (img.complite) {
                        $wrap.css('background-image', 'url(' + img.src + ')');
                        $wrap.addClass('loaded');
                    } else {
                        img.onload = function () {
                            $wrap.css('background-image', 'url(' + img.src + ')');
                            $wrap.addClass('loaded');
                        };

                        if (img.complite) {
                            $wrap.css('background-image', 'url(' + img.src + ')');
                            $wrap.addClass('loaded');
                        }
                    }
                });
            }, 100);
        }

        return galleryInit;
    }]).factory('getSize', [function () {
        return function () {
            var width = $(window).width(),
                SCREEN_WIDTH = {
                    'xs-max': 768,
                    'sm-min': 768,
                    'sm-max': 992,
                    'md-min': 992,
                    'md-max': 1200,
                    'lg-min': 1200,
                    'lg-max': 1600,
                    'xl-min': 1600,
                    'xl-max': 1920,
                    'xl-min1': 1920,
                    'xl-max1': 2040,
                    'xl-min2': 2040,
                    'xl-max2': 2560
                };

            switch (true) {
                case (width < SCREEN_WIDTH['xs-max']) :
                    return '768';
                case (SCREEN_WIDTH['sm-min'] <= width && width <= SCREEN_WIDTH['sm-max']) :
                    return '992';
                case (SCREEN_WIDTH['md-min'] <= width && width <= SCREEN_WIDTH['md-max']) :
                    return '1200';
                case (SCREEN_WIDTH['lg-min'] <= width && width <= SCREEN_WIDTH['lg-max']) :
                    return '1600';
                case (SCREEN_WIDTH['xl-min'] <= width && width <= SCREEN_WIDTH['xl-max']) :
                    return '1920';
                case (SCREEN_WIDTH['xl-min1'] <= width && width <= SCREEN_WIDTH['xl-max1']) :
                    return '2040';
                case (SCREEN_WIDTH['xl-min2'] <= width && width <= SCREEN_WIDTH['xl-max2']) :
                    return '2560';
                case (width > SCREEN_WIDTH['xl-max2']) :
                    return +'2560';
            }
        };
    }]).factory('fancyRender', ['getSize', 'fancyboxService', function (getSize, fancyboxService) {
        return function ($scope, data, status, headers, config) {
            var size = 'img-' + getSize();
            $scope.images = data.filter(function (item) {
                return !!item.better_featured_image || item.format === 'video';
            }).map(function (item) {
                if (item.format === 'video') {
                    item.thumb = "https://img.youtube.com/vi/" + extractVideoID(item.acf.url) + "/mqdefault.jpg";
                    return item;
                }
                item.title = $('<textarea />').html(item.title.rendered).text();
                item.small = item.better_featured_image.media_details.sizes.medium.source_url;
                item.big = (item.better_featured_image.media_details.sizes[size] || item.better_featured_image).source_url;
                return item;
            });
            fancyboxService();
        };
    }]);
    function extractVideoID(url){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        if ( match && match[7].length == 11 ){
          return match[7];
        } else {
          console.log("Invalid URL.");
        }
      }
});