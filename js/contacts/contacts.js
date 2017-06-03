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
            templateUrl: require.toUrl('contacts/index.html'),
            url: '/contacts',
            controller: function ($scope, contactsData) {
                $scope.contact = contactsData.data;
                $scope.shops = [{
                    title: 'behance',
                    image: require.toUrl('../images/shops/behance-thumb.png'),
                    link: 'https://www.behance.net/LidikArt'
                }, {
                    title: 'shutterstock',
                    image: require.toUrl('../images/shops/shutterstock-thumb.jpg'),
                    link: 'http://www.shutterstock.com/cat.mhtml?gallery_id=3563846&page=1'
                },
                    //  {
                    //  title: 'etsy',
                    //  link: 'https://www.etsy.com/shop/LidikArt',
                    //  image: require.toUrl('../images/shops/etsy-thumb.png')
                    //}, {
                    //  title: 'saatchiart',
                    //  link: 'http://www.saatchiart.com/account/artworks/780825',
                    //  image: require.toUrl('../images/shops/saatchiart-thumb.png')
                    //},
                    {
                        title: 'fineartamerica',
                        image: require.toUrl('../images/shops/fineartamerica-thumb.jpg'),
                        link: 'http://fineartamerica.com/profiles/lidia-matviyenko.html'
                    }];
            }
          });
      }
    ]);
});
