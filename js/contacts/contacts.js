define([
  'angular',
  'services/contacts-service'
], function(angular) {
  'use strict';

  angular.module('lidikArt.contacts', ['ui.router'])
    .config(['$stateProvider',
      function ($stateProvider) {
        $stateProvider
          .state('app.contacts', {
            templateUrl: window.globalConfig.path + 'js/contacts/index.html',
            url: '/contacts',
            controller: function ($scope, contactsData) {
              var path = window.globalConfig.path;
              $scope.contact = contactsData.data;
              $scope.shops = [{
                title: 'shutterstock',
                image: path + '/images/shops/shutterstock-thumb.jpg',
                link: 'http://www.shutterstock.com/cat.mhtml?gallery_id=3563846&page=1'
              },
              //  {
              //  title: 'etsy',
              //  link: 'https://www.etsy.com/shop/LidikArt',
              //  image: path + '/images/shops/etsy-thumb.png'
              //}, {
              //  title: 'saatchiart',
              //  link: 'http://www.saatchiart.com/account/artworks/780825',
              //  image: path + '/images/shops/saatchiart-thumb.png'
              //},
                {
                title: 'fineartamerica',
                image: path + '/images/shops/fineartamerica-thumb.jpg',
                link: 'http://fineartamerica.com/profiles/lidia-matviyenko.html'
              }, {
                title: 'behance',
                image: path + '/images/shops/behance-thumb.png',
                link: 'https://www.behance.net/LidikArt'
              }];
            }
          });
      }
    ]);
});
