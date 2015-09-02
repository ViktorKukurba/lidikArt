define([
  'angular'
], function(angular) {
  'use strict';
// Declare app level module which depends on views, and components
  return angular.module('lidikArt', [
    'lidikArt.gallery',
    'lidikArt.contacts',
    'lidikArt.about',
    'facebook',
    'ui.router',
    'ngSanitize',
    'rawAjaxBusyIndicator',
    'pascalprecht.translate',
    'navigation'
  ]);
});
