define([
  'angular',
  'services/category-service'
], function(angular) {
  'use strict';
  angular.module('lidikArt').factory('contactsData', [function () {
    var data = {
      message: 'З питань співпраці та замовлення продукції пишіть сюди',
      email: 'lidikart22@gmail.com',
      mobile: '+380961721752',
      socialMessage: 'Знайти нас можна в мережах',
      fb: 'https://www.facebook.com/LidikArt',
      vk: 'http://vk.com/lidikart',
      twitter: 'https://twitter.com/Lllidik',
      instagram: 'https://instagram.com/lidikart'
    };
    return {
      data: data
    };
  }]);
});
