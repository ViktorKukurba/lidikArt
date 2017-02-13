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
  baseUrl: '/wp-content/themes/lidik-art/js',
  paths: {
    angular: '../bower_components/angular/angular.min',
    'angular-easyfb': '../bower_components/angular-easyfb/build/angular-easyfb.min',
    'angular-route': '../bower_components/angular-route/angular-route.min',
    'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router.min',
    'angular-sanitize': '../bower_components/angular-sanitize/angular-sanitize.min',
    'angular-translate': '../bower_components/angular-translate/angular-translate.min',
    'angular-translate-loader': '../bower_components/angular-translate-loader-url/angular-translate-loader-url.min',
    'angular-translate-loader-static': '../bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.min',
    fancybox: '../bower_components/fancybox/source/jquery.fancybox',
    'fancybox-buttons': '../bower_components/fancybox/source/helpers/jquery.fancybox-buttons',
    'fancybox-thumbs': '../bower_components/fancybox/source/helpers/jquery.fancybox-thumbs',
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
    'fancybox-thumbs': {
      deps: ['fancybox']
    },
    'fancybox-buttons': {
      deps: ['fancybox']
    },
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
  'angular-translate',
  'angular-translate-loader-static',
  'directives/navigation/navigation',
  'footer-controller',
  'jquery-zoom'
], function(angular, app) {
  window.globalConfig = {
      path :'/wp-content/themes/lidik-art/'
  };

  app.constant('pageCategory', {
    'art': 10,
    'production': 11
  }).config(function ($stateProvider, $urlRouterProvider, $translateProvider, $locationProvider, ezfbProvider) {
    $stateProvider.state('app', {
      abstract: true,
      //url: '?',
      url: '{lang:(?:/[^/]+)?}',
      templateUrl: window.globalConfig.path + 'js/index.html',
      controller: function($scope, $stateParams, $translate) {
        var lang = $stateParams.lang === '/en' ? 'en' : 'ua';
        if ($translate.use() !== lang) {
          $translate.use(lang);
        }

        document.body.className = lang;
        $('[data-value=' + lang + ']').addClass('active');

        var state = location.pathname.replace('en', '').
            replace('ua', '').
            replace(/\//g, '');

        var $body = $(document.body).
            addClass((state || 'home') + '-page');

        $scope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams) {
              $body.
                  removeClass(fromState.name.replace('app.', '') + '-page').
                  addClass(toState.name.replace('app.', '')+ '-page');
            });
      }
    });

    var lang = location.pathname.indexOf('/en') !== -1 ? 'en' : 'ua';

    $translateProvider.useSanitizeValueStrategy('sanitize');

    $translateProvider.preferredLanguage(lang);

    $translateProvider.useStaticFilesLoader({
      prefix: 'public/languages/',
      suffix: '.json'
    });

    setTimeout(function() {
      $('head meta[property="og:description"]').
          attr('content', $('.about-message p').text());
    }, 500);

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    $urlRouterProvider.otherwise((lang === 'en' ? lang : '') + '/');

    ezfbProvider.setLocale('ua_UA');
  });
  app.config(function (ezfbProvider) {
    ezfbProvider.setInitParams({
            appId: '237271143059295'
          });
      });
  angular.bootstrap(document, ['lidikArt']);
});
