define([
  'angular'
], function(angular) {
  'use strict';
// Declare app level module which depends on views, and components
  return angular.module('lidikArt', [
    'lidikArt.home',
    'lidikArt.gallery',
    'lidikArt.production',
    'lidikArt.contacts',
    'lidikArt.about',
    'lidikArt.statement',
    'lidikArt.exhibitions',
    'ui.router',
    'ngSanitize',
    'rawAjaxBusyIndicator',
    'pascalprecht.translate',
    'navigation',
    'ezfb'
  ]);
});