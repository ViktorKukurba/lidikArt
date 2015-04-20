define([
  'angular',
  'services/category-service'
], function(angular) {
  'use strict';

  angular.module('lidikArt').factory('fbPageData', ['Facebook', function (Facebook) {
    var pageData,
      callback,
      logged = false;

    var userIsConnected = false;

    Facebook.getLoginStatus(function (response) {
      if (response.status == 'connected') {
        userIsConnected = true;
        logged = true;
        renderFBContent();
      }
    });

    /**
     * IntentLogin
     */
    var intentLogin = function () {
      if (!userIsConnected) {
        login();
      }
    };

    /**
     * Login
     */
    var login = function () {
      Facebook.login(function (response) {
        if (response.status == 'connected') {
          logged = true;
          renderFBContent();
        }
      });
    };

    function renderFBContent() {
      Facebook.api('/Fredra.61', function (response) {
        pageData = response;
        callback(pageData);
      });
    }

    return {
      isLogged: function () {
        return logged
      },

      isReady: Facebook.isReady,

      intentLogin: intentLogin,

      getPageData: function () {
        return pageData;
      },
      setCallback: function (cb) {
        callback = cb;
      }
    };
  }]);
});
