'use strict';


taxonomyDirectives.directive('breadcrumbs', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/static/partials/breadcrumbs.html',
        scope: {
            items: '='
        }
    };
});