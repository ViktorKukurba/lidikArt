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
    fancybox: '../bower_components/fancybox/source/jquery.fancybox',
    'fancybox-buttons': '../bower_components/fancybox/source/helpers/jquery.fancybox-buttons',
    jquery: '../bower_components/jquery/dist/jquery.min',
    'jquery-mousewheel': '../bower_components/jquery-mousewheel/jquery.mousewheel.min',
    wow: '../bower_components/wow/dist/wow.min'
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
  'services/facebook-service',
  'directives/navigation/navigation'
], function(angular, app) {
  app.config(function ($stateProvider, $urlRouterProvider) {

    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise('/gallery');

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
