fredra.factory('generateCode', function() {
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  function generateCode(len) {
    len = len || 8;
    var text = '';
    for (var i = 0; i < len; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  return {
    getCode: generateCode
  };
})
    .factory('pbRequestData', ['$http', function($http) {
      var pbConfig,
          init = false,
          callback;
      $http.get('./pb-config.json').
          success(function(data, status, headers, config) {
            init = true;
            pbConfig = data;
            callback(data);
          });

      return {
        isInit: function() {
          return init;
        },
        getPbConfig: function() {
          return pbConfig;
        },
        setCallback: function(cb) {
          callback = cb;
        }
      };
    }])
    .factory('moneyuaRequestData', ['$http', function($http) {
      var pbConfig,
          init = false,
          callback;
      $http.get('./moneyua-config.json').
          success(function(data, status, headers, config) {
            init = true;
            pbConfig = data;
            callback(data);
          });

      return {
        isInit: function() {
          return init;
        },
        getPbConfig: function() {
          return pbConfig;
        },
        setCallback: function(cb) {
          callback = cb;
        }
      };
    }]);
