'use strict';


taxonomyDirectives.directive('breadcrumbs', function(viewsPrefix) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: viewsPrefix + 'breadcrumbs.html',
        scope: {
            items: '='
        }
    };
});