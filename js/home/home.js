define([
  'angular',
  'services/category-service',
  'angular-translate',
  'angular-translate-loader-static',
  'slick-carousel'
], function(angular) {
  'use strict';

  angular.module('lidikArt.home', ['ui.router', 'pascalprecht.translate'])
    .config(['$stateProvider',
      function ($stateProvider) {
        $stateProvider.state('app.home', {
          templateUrl: window.globalConfig.path + 'js/home/index.html',
          url: '/',
          controller: function ($scope, $translate) {
            console.log('app.home');
            var lang = $translate.use() === 'en' ? 'en/' : '';
            var path = window.globalConfig.path;
            $scope.homeBlocks = [
              {
                image: path + 'images/lidikAva.jpg',
                items: [{
                  link: lang + 'gallery',
                  name: 'pages.gallery.name'
                },
                  {
                    link: lang + 'about',
                    name: 'pages.about.name'
                  },
                  {
                    link: lang + 'statement',
                    name: 'pages.statement.name'
                  }
                ]
              },
              {
                image: path + 'images/logo3.jpg',
                items: [
                  {
                    link: lang + 'production',
                    name: 'pages.production.name'
                  },
                  {
                    link: lang + 'contacts',
                    name: 'pages.contacts.name'
                  }]
              }
            ];


            $scope.shops = [{
              name: 'shutterstock',
              title: 'pages.home.shops.shutterstock',
              image: path + '/images/shops/shutterstock-logo.png',
              link: 'http://www.shutterstock.com/cat.mhtml?gallery_id=3563846&page=1'
            },
            //  {
            //  name: 'etsy',
            //  title: 'pages.home.shops.etsy',
            //  link: 'https://www.etsy.com/shop/LidikArt',
            //  image: path + '/images/shops/etsy-logo.png'
            //},
            //  {
            //  name: 'saatchiart',
            //  title: 'pages.home.shops.saatchiart',
            //  link: 'http://www.saatchiart.com/account/artworks/780825',
            //  image: path + '/images/shops/saatchiart-logo.png'
            //},
              {
              name: 'fineartamerica',
              title: 'pages.home.shops.fineartamerica',
              image: path + 'images/shops/fineartamerica-logo.png',
              link: 'http://fineartamerica.com/profiles/lidia-matviyenko.html'
            }, {
              name: 'behance',
              title: 'pages.home.shops.behance',
              image: path + 'images/shops/behance-logo.png',
              link: 'https://www.behance.net/LidikArt'
            }];

            //shopsService.shops().then(function(data) {
            //  var shutterstockItems = $.map(data.shutterstock.data, function(item) {
            //    return {
            //      link: item,
            //      image: item.assets.large_thumb.url
            //    };
            //  });
            //
            //  var etsyItems = $.map(data.etsy.data, function(item) {
            //    return {
            //      link: item,
            //      image: item.MainImage.url_170x135
            //    };
            //  });

              //console.log(shutterstockItems);
              //console.log(etsyItems);
            //});
            //
            //  $scope.$apply(function() {
            //    $scope.shops = [{
            //      image: 'public/images/shutterstock-logo.png',
            //      items: shutterstockItems,
            //      link: 'http://www.shutterstock.com/cat.mhtml?gallery_id=3563846&page=1'
            //    }, {
            //      image: '',
            //      items: etsyItems,
            //      link: ''
            //    }];
            //  });
            //
            //  setTimeout(function(){
            //    $('#slick').slick({
            //      dots: false,
            //      infinite: true,
            //      speed: 100,
            //      slidesToShow: 4,
            //      arrows: false,
            //      autoplay:true
            //    });
            //  },100);
            //  console.log('shutterstock', $scope.shutterstock);
            //});
          }
        });
      }]);
});
