/*!
 *
 * main.js
 * LidikArt web application.
 * http://lidikart.com.ua
 *
 *
 * Copyright 2015, Viktor Kukurba
 * @author: Viktor Kukurba
 * License: MIT
 *
 */
require.config({
  // baseUrl: '/lidik-art/js/',
  baseUrl: '/js/',
  // baseUrl: '/wp-content/themes/lidik-art/js',
  paths: {
    angular: '../bower_components/angular/angular.min',
    'angular-easyfb': '../bower_components/angular-easyfb/build/angular-easyfb.min',
    'angular-route': '../bower_components/angular-route/angular-route.min',
    'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router.min',
    'angular-sanitize': '../bower_components/angular-sanitize/angular-sanitize',
    'angular-translate': '../bower_components/angular-translate/angular-translate',
    'angular-translate-loader': '../bower_components/angular-translate-loader-url/angular-translate-loader-url.min',
    'angular-translate-loader-static': '../bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.min',
    fancybox: '../node_modules/@fancyapps/fancybox/dist/jquery.fancybox',
    jquery: '../bower_components/jquery/dist/jquery.min',
    'jquery-zoom': '../bower_components/jquery-zoom/jquery.zoom.min',
    'jquery-mousewheel': '../bower_components/jquery-mousewheel/jquery.mousewheel.min',
    'slick-carousel': '../bower_components/slick-carousel/slick/slick.min',
    wow: '../bower_components/wow/dist/wow.min',
    busyIndicator: 'directives/busy-indicator/busyIndicator'
  },
  shim: {
    angular: {
      exports: 'angular'
    },
    'angular-ui-router': {
      deps: ['angular']
    },
    'fancybox': {
      deps: ['jquery']
    },
    'angular-route': {
      deps: ['angular']
    },
    'angular-easyfb': {
      deps: ['angular']
    },
    'angular-sanitize': {
      deps: ['angular']
    },
    busyIndicator: {
      deps: ['angular', 'angular-route']
    },
    'angular-translate': {
      deps: ['angular']
    },
    'angular-translate-loader': {
      deps: ['angular-translate']
    },
    'angular-translate-loader-static': {
      deps: ['angular-translate']
    },
    //'fancybox-thumbs': {
    //  deps: ['fancybox']
    //},
    //'fancybox-buttons': {
    //  deps: ['fancybox']
    //},
    'jquery-zoom': {
      deps: ['jquery']
    }
  }
});
require([
  'angular',
  'app',
  'angular-route',
  'jquery',
  'angular-ui-router',
  'angular-easyfb',
  'busyIndicator',
  'about/about',
  'angular-sanitize',
  'contacts/contacts',
  'home/home',
  'fun/fun',
  'statement/statement',
  'gallery/gallery',
  'gallery/album',
  'exhibitions/exhibitions',
  'decor/decor',
  'angular-translate',
  'angular-translate-loader-static',
  'directives/navigation/navigation',
  'footer-controller',
  'jquery-zoom'
], function(angular, app) {
  window.globalConfig = {
      path :'/wp-content/themes/lidik-art/'
  };

  app.config(function ($stateProvider, $urlRouterProvider, $translateProvider,
                       $locationProvider, ezfbProvider) {

    $stateProvider.state('app', {
      abstract: true,
      url: '',
      templateUrl: require.toUrl('index.html'),
      controller: appController
    }).state('app.en', {
      abstract: true,
      url: '/en',
      template: '<ui-view></ui-view>'
    });

    function appController($scope, $stateParams, $translate, $rootScope) {
      lang = location.pathname.indexOf('/en') === 0 ? 'en' : 'ua';

      if ($translate.use() !== lang) {
        $translate.use(lang);
      }

      if ($stateParams.lang == '/en') {
        $stateParams.lang = 'en';
      }

      document.body.className = lang;
      $('[data-value=' + lang + ']').addClass('active');

      var state = location.pathname.replace('en', '').
      replace('ua', '').
      replace(/\//g, '');

      var $body = $(document.body).
      addClass((state || 'gallery') + '-page');

      $scope.$on('$stateChangeStart',
          function(event, toState, toParams, fromState) {
            $body.
            removeClass(fromState.name.replace('app.', '') + '-page').
            addClass(toState.name.replace('app.', '')+ '-page');
            setTimeout(contentMinHeight, 1e1);
          });

      setTimeout(contentMinHeight, 2e3);

      $rootScope.$on('$stateChangeStart',
          function(event, toState, toParams, fromState, fromParams){
            if (toState.name == fromState.name &&
                toState.url == fromState.url &&
                JSON.stringify(toParams) == JSON.stringify(fromParams)) {
              event.preventDefault();
            }
          });
    }

    function contentMinHeight() {
      var bannerHeight = $('.reservation_banner').length ? $('.reservation_banner').outerHeight() : 0;
      $('.main').css('min-height',
          $(window).height() -
          $('.footer').outerHeight(true) -
          $('.header_bottom').height() -
          bannerHeight);
    }

    var lang = location.pathname.indexOf('/en') !== -1 ? 'en' : 'ua';

    $translateProvider.useSanitizeValueStrategy('sanitize');

    $translateProvider.preferredLanguage(lang);

    $translateProvider.useStaticFilesLoader({
      prefix: require.toUrl('../languages/'),
      suffix: '.json'
    });

    window.onscroll = function(e) {
      var pageY = window.pageYOffset || document.documentElement.scrollTop,
          nav = document.getElementById('galleries-navigation'),
          top = $('navigation .header_bottom').height();

      if (pageY >= top) {
        $(nav).addClass('fixed');
      } else {
        $(nav).removeClass('fixed');
      }
    };

    setTimeout(function() {
      $('head meta[property="og:description"]').
          attr('content', $('.about-message p').text());
    }, 500);

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: true
    });
    $urlRouterProvider.otherwise((lang === 'en' ? lang : '') + '/');

    // ezfbProvider.setLocale('ua_UA');
  });
  app.config(function (ezfbProvider) {
    ezfbProvider.setInitParams({
            appId: '237271143059295'
          });
      });

  angular.bootstrap(document, ['lidikArt']);
});
