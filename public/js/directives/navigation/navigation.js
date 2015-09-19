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
    .directive('navigation', function($timeout, $location) {
      return {
        compile: function compile() {
          return {
            pre: function($scope, element) {
              //var $element = $(element);
              //$element.on('click', 'a', function(e) {
              //  var li = $(e.target).parent('li');
              //  var type = li.data('type');
              //  var isSubTab = type === 'sub-tab';
              //  var tabLi = isSubTab ? li.parents('li') : li;
              //
              //  var tabId = +tabLi.data('value');
              //
              //  var subTabId = +li.data('value');
              //  handleChange(tabId, isSubTab, subTabId);
              //});

              function handleChange(tabId, isSubTab, subTabId) {
                var selectedArr = $.grep($scope.tabs, function(item) {
                  return item.name === tabId;
                });

                if (isSubTab && selectedArr.length) {
                  var selectedSub = $.grep(selectedArr[0].subTabs, function(item) {
                    return item.name === subTabId;
                  });
                  if (selectedSub.length) {
                    $scope.selectedTab = selectedSub[0];
                  }
                } else if (selectedArr.length) {
                  $scope.selectedTab = selectedArr[0];
                }
              }

              $scope.$on('$locationChangeSuccess', function(event,url, oldUrl, state, oldState) {
                console.log(event, url, oldUrl, state, oldState);

                var paths = $location.path().replace('/','').split('/');

                if (paths[0] === 'en' || paths[0] === 'ua') {
                  paths.shift();
                }

                console.log(paths);

                if (paths.length === 1) {
                  handleChange(paths[0], false);
                } else {
                  handleChange(paths[0], true, +paths[1]);
                }

                console.log();

              });

            }
          };
        },
        templateUrl: 'js/directives/navigation/index.html',
        restrict: 'AE',
        scope: true,
        controller: ['$scope', '$location', '$compile', 'categoryData', '$translate',
          function($scope, $location, $compile, categoryData, $translate) {

            $('.lang').delegate('a', 'click', function(e) {
              var lang = $(e.target).data('value');
              $translate.use(lang);

              var href = '' + (lang === 'en' ? 'en/' : '');
              href += location.pathname.replace('/public/', '')
                  .replace('en/', '')
                  .replace('ua/', '');
              location.href = href;
            });

            //categoryData.categories().success(function (data, status, headers, config) {
            categoryData.data().then(function(values) {

              var lang = $translate.use() === 'en' ? 'en/' : '';

              var aLang = location.pathname.indexOf('/en') !== -1 ? 'en' : 'ua';

              $('[data-value=' + aLang + ']').addClass('active');

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
