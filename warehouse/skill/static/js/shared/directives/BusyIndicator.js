angular.module('wh.shared.busyIndicator', [])

    .directive('busyIndicator', function ($rootScope) {
                   return {
                       restrict: 'C',
                       link: function (scope, element) {
                           $rootScope.$on('$routeChangeStart', function () {
                               element.addClass('show');
                               element.text('Loading...');
                           });
                           $rootScope.$on('$routeChangeSuccess', function () {
                               element.removeClass('show');
                               element.text('');
                           });
                       }
                   };
               });