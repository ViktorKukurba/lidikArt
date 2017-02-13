define([
  'angular'
], function(angular) {

  return angular.module('navigation', [])
    .directive('navigation', function($timeout, $location) {
        var defaultTab = {
          title: 'LidikArt'
        };

        function handleChange($scope, tabId, isSubTab, subTabId) {
          var selectedArr = $.grep($scope.tabs, function(item) {
            return item.slug === tabId;
          });

          if (isSubTab && selectedArr.length) {
            var selectedSub = $.grep(selectedArr[0].subTabs, function(item) {
              return item.name == subTabId;
            });

            if (selectedSub.length) {
              $scope.selectedTab = selectedSub[0];
            }
          } else if (selectedArr.length) {
            $scope.selectedTab = selectedArr[0];
          } else {
            $scope.selectedTab = defaultTab;
          }

          var mobileMenu = document.getElementById('mobile_menu');
          if (mobileMenu) {
            mobileMenu.checked = false;
          }

          $('#shadow')[mobileMenu.checked? 'show': 'hide']();
        }

        function updateSelectedTabState($scope) {
          var paths = $location.path().replace('/','').split('/');

          if (paths[0] === 'en' || paths[0] === 'ua') {
            paths.shift();
          }

          if (paths.length === 1) {
            handleChange($scope, paths[0], false);
          } else if (paths.length === 2)  {
            handleChange($scope, paths[0], true, paths[1]);
          } else {
            handleChange($scope, paths[1], true, +paths[2]);
          }
        }

      return {
        compile: function compile() {
          return {
            pre: function($scope, element) {
              $('body').on('change', '#mobile_menu', function(e) {
                $('#shadow')[e.target.checked? 'addClass': 'removeClass']('show');
              }).on('click', '#shadow', function(e) {
                $('#mobile_menu').attr('checked', false).change();
              });

              $scope.$on('$locationChangeSuccess', function(event, url, oldUrl, state, oldState) {
                updateSelectedTabState($scope);
              });

            }
          };
        },
        templateUrl: window.globalConfig.path + 'js/directives/navigation/index.html',
        restrict: 'AE',
        scope: true,
        controller: ['$scope', '$location', '$compile', 'categoryData', '$translate', '$state',
          function($scope, $location, $compile, categoryData, $translate, $state) {
            window.$state = $state;

            $('.lang').off('click', 'a', langChange_).
                on('click', 'a', langChange_);

            function langChange_(e) {
              var lang = $(e.target).data('value');
              $translate.use(lang).then(function() {
                $scope.lang = lang;
                var href = '' + (lang === 'en' ? 'en' : '');
                href += location.pathname.replace('en/', '').replace('ua/', '');
                //$state.go($state.current.name, {lang: href});
                //$state.transitionTo($state.current.name, {lang: href});
                location.href = href;
                //$location.url(href);
                //$location.replace();
                //window.history.pushState(null,'any', $location.absUrl());
                //history.pushState(null, "lang", href);
              });
            }

            console.log('nav-controller');

            categoryData.pagesCategories().then(function(data) {
              var pages = data.pagesCategories;
              var lang = $translate.use() === 'en' ? 'en/' : '';
              $scope.lang = lang;
              var aLang = location.pathname.indexOf('/en') !== -1 ? 'en' : 'ua';
              $('[data-value=' + aLang + ']').addClass('active');
              pages.forEach(function(page) {
                page.link = lang + page.slug;
                if (page.slug != 'gallery' && page.categories.length) {

                  page.subTabs = page.categories.map(function (category) {
                    return {
                      link: lang + page.slug + '/' + category.id,
                      title: $('<textarea />').html(category.name).text(),
                      name: category.id
                    };
                  });
                }
              });

              $scope.tabs = pages;
              updateSelectedTabState($scope);
              $scope.tabClass = function (tab) {
                var tabClass = '';
                if (tab.subTabs) {
                  tabClass += 'parent-item';
                  if (tab.subTabs.indexOf($scope.selectedTab) > -1) {
                    tabClass += ' active';
                  }
                }

                if ($scope.selectedTab == tab) {
                  tabClass += ' active';
                }

                return tabClass;
              };
              $(document.body).addClass('loaded');
            });
          }]
      };
    });
});
