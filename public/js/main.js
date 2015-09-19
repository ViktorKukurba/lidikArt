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
  baseUrl: 'js',
  paths: {
    angular: '../bower_components/angular/angular.min',
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
    'angular-facebook': {
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
  'fancybox',
  'busyIndicator',
  'about/about',
  'angular-facebook',
  'angular-sanitize',
  'contacts/contacts',
  'gallery/gallery',
  'gallery/album',
  'angular-translate',
  'angular-translate-loader-static',
  'services/facebook-service',
  'directives/navigation/navigation',
  'footer-controller',
  'jquery-zoom'
], function(angular, app) {
  app.config(function ($stateProvider, $urlRouterProvider, $translateProvider, $locationProvider) {

    $stateProvider.state('app', {
      abstract: true,
      url: '{lang:(?:/[^/]+)?}',
      templateUrl: 'js/index.html',
      controller: function($scope, $stateParams, $translate) {
        var lang = $stateParams.lang === '/en' ? 'en' : 'ua';

        $translate.use(lang);
        $('[data-value=' + lang + ']').addClass('active');
      }
    });

    var lang = location.pathname.indexOf('/en') !== -1 ? 'en' : 'ua';

    $translateProvider.preferredLanguage(lang);

    $translateProvider.useStaticFilesLoader({
      prefix: 'languages/',
      suffix: '.json'
    });
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise(lang + '/gallery');


  })
    .config([
      'FacebookProvider',
      function (FacebookProvider) {
        var myAppId = '380038068742752';
        FacebookProvider.init(myAppId);

      }
    ]);

  angular.bootstrap(document, ['lidikArt']);
});
