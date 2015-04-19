define([
  'angular'
], function(angular) {
  'use strict';
// Declare app level module which depends on views, and components
  return angular.module('lidikArt', [ 'lidikArt.gallery',
    'facebook',
    'ui.router',
    'ngSanitize',
    'rawAjaxBusyIndicator'
  ]);
});
