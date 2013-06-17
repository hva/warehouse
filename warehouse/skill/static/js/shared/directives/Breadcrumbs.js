angular.module('wh.shared.breadcrumbs', [])

    .directive('breadcrumbs', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/static/js/shared/views/breadcrumbs.html',
            scope: {
                items: '='
            }
        };
    });