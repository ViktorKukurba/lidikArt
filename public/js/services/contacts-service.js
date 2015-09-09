define([
  'angular',
  'services/category-service'
], function(angular) {
  'use strict';
  angular.module('lidikArt').factory('contactsData', [function () {
    var data = {
      message: 'Звертайтеся з цікавими пропозиціями та замовленнями.',
      email: 'lidik@list.ru',
      mobile: '0961721752',
      fb: 'https://www.facebook.com/pages/Lidikart/1506114906267456',
      vk: 'http://vk.com/lidikart'
    };
    return {
      data: data
    };
  }]);
});
