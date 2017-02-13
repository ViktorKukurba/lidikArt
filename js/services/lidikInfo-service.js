define([
  'angular'
], function(angular) {
  'use strict';
  var SERVICE_URL = '/wp-json/wp/v2/';
  angular.module('lidikArt').factory('lidikInfo', ['$http', '$translate', function ($http, $translate) {
    var url = SERVICE_URL + 'pages?lang=' + $translate.use();
    return $http.get(url);
  }]);
  angular.module('lidikArt').factory('translator', ['$translate', function ($translate) {
    return {
      translate: function(str) {
        if (str) {
          var lang = $translate.use() === 'en' ? 'en' : 'uk',
              regString = '<\!--\:' + lang + '-->(.*?)<\!--\:-->',
              re = new RegExp(regString, 'g'),
              translated = re.exec(str.replace(/(\r\n|\n|\r)/gm, ''));

          if (translated) {
            return translated[1];
          }
        }
        return str;
      }
    };
  }]);
});
