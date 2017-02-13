define([
  'angular'
], function(angular) {
  'use strict';

  angular.module('lidikArt').factory('shopsService', ['$http', '$translate', '$q', function($http, $translate, $q) {


    /* Fetch functions */
    var API_URL = 'https://api.shutterstock.com/v2';
    // Search media by type
    var authorization = 'Basic ' + window.btoa('4d1df9cf57d89ecdd697' + ':' + 'cfcae865795cd41bf3f1c54241a350d15ba4a655');
    if (!authorization) return;
    var url = API_URL + '/images/search?contributor=3563846&image_type=illustration&&license=commercial&sort=random&view=minimal&per_page=100&';
    var shutterstock = $.ajax({
      url: url,
      data: {},
      headers: {
        Authorization: authorization
      }
    })
        .done(function(data) {
          return data;
        })
        .fail(function(xhr, status, err) {
          //alert('Failed to retrieve ' + mediaType + ' search results:\n' + JSON.stringify(xhr.responseJSON, null, 2));
        });

    var etsyData = $.ajax({
      type: 'GET',
      url: window.globalConfig.path + '/index.php?json_route=/etsy',
      dataType: 'json',
      success: function(data) {
        console.log('Success! etsy', data);
      },
      error: function(error) {
        console.log('Uh Oh!', error);
      }
    });

    var behanceData = $.ajax({
      type: 'GET',
      url: window.globalConfig.path + '/index.php?json_route=/behance',
      dataType: 'json'
    });

    return {
      etsy: etsyData,
      shutterstock: shutterstock,
      behance: behanceData,
      shops: function() {
        return $q.all({
          //etsy: this.etsy,
          shutterstock: this.shutterstock,
          behance: this.behance
        });
      }
    };
  }]);
});
