define([
  'angular'
], function(angular) {

  function formatCategories(data, lang) {
    return data.map(function (item) {
      return {
        link: lang + 'gallery/' + item.ID,
        title: item.name,
        name: item.ID
      };
    });
  }

  return angular.module('navigation', [])
    .directive('navigation', function($timeout) {
      return {
        compile: function compile() {
          return {
            pre: function($scope, element) {
              var $element = $(element);
              $element.on('click', 'a', function(e) {
                var li = $(e.target).parent('li');
                var type = li.data('type');
                var isSubTab = type === 'sub-tab';
                var tabLi = isSubTab ? li.parents('li') : li;

                var tabId = +tabLi.data('value');

                var selectedArr = $.grep($scope.tabs, function(item) {
                  return item.ID === tabId;
                });

                if (isSubTab && selectedArr.length) {
                  var selectedSub = $.grep(selectedArr[0].subTabs, function(item) {
                    return item.name === +li.data('value');
                  });
                  if (selectedSub.length) {
                    $scope.selectedTab = selectedSub[0];
                  }
                } else if (selectedArr.length) {
                  $scope.selectedTab = selectedArr[0];
                }
                console.log('dsdd', $scope.selectedTab);
              });

            }
          };
        },
        templateUrl: 'js/directives/navigation/index.html',
        restrict: 'AE',
        scope: true,
        controller: ['$scope', '$location', '$compile', 'categoryData', '$translate',
          function($scope, $location, $compile, categoryData, $translate) {

            //categoryData.categories().success(function (data, status, headers, config) {
            categoryData.data().then(function(values) {

              var lang = $translate.use() === 'en' ? 'en/' : '';

              values.pages.data.sort(function(a, b) {
                return a.menu_order - b.menu_order;
              });

              values.pages.data.forEach(function(item) {
                item.link = lang + item.name;
                if ('gallery' === item.name) {
                  item.subTabs = formatCategories(values.categories.data, lang);
                }
              });

              $scope.tabs = values.pages.data;

              var selectedTab = 0;
              var subTab;

              $scope.tabs.forEach(function (item, index) {
                if ($location.path().indexOf(item.link.replace('#', '')) > -1) {
                  selectedTab = index;

                  if ($scope.tabs[selectedTab].subTabs) {
                    $scope.tabs[selectedTab].subTabs.forEach(function (item, index) {
                      if ($location.path().indexOf(item.link.replace('#', '')) > -1) {
                        subTab = index;
                      }
                    });
                  }
                }
              });

              if (!angular.isUndefined(selectedTab)) {
                var tab = $scope.tabs[selectedTab];
                if (subTab) {
                  $scope.selectedTab = tab.subTabs[subTab];
                } else {
                  $scope.selectedTab = tab;
                }
              }

              $scope.tabClass = function (tab) {
                if ($scope.selectedTab == tab) {
                  return "active";
                } else {
                  return "";
                }
              };
              $('.header_bottom').css('visibility', 'visible');
              $('.lang').css('visibility', 'visible');
              $('.footer').css('visibility', 'visible');
            });
          }]
      };
    });
});
