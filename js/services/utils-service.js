define([
  'angular'
], function(angular) {
  angular.module('services', []).provider("stateManager", ['$stateProvider', function ($stateProvider) {
    this.register = function(state) {
      Array.prototype.forEach.call(arguments, function(state) {
        $stateProvider.state(state.name, state);
        $stateProvider.state(state.name.replace(/^app+/, 'app.en'), $.extend({}, state));
      });
    };

    this.$get = ['$stateProvider'];
  }]);
});
