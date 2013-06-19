angular.module('taxonomy.services', ['wh.shared.taxonomy', 'wh.shared.sortorder']);
angular.module('taxonomy.controllers', ['wh.shared.breadcrumbs', 'wh.shared.optionsDisabled']);

angular.module('taxonomy', ['taxonomy.services', 'taxonomy.controllers'])

    .constant('viewsPrefix', '/static/js/taxonomy/views/')

    .config(function ($routeProvider, viewsPrefix) {
        $routeProvider.when('/list', {
            templateUrl: viewsPrefix + 'list.html',
            controller: 'TaxonomyListController'
        });
        $routeProvider.when('/add', {
            templateUrl: viewsPrefix + 'edit.html',
            controller: 'TaxonomyAddController'
        });
        $routeProvider.when('/edit/:id', {
            templateUrl: viewsPrefix + 'edit.html',
            controller: 'TaxonomyEditController'
        });
        $routeProvider.otherwise({redirectTo: '/list'});
    })

    .config(function ($httpProvider) {
        var input = document.getElementsByName('csrfmiddlewaretoken')[0];
        if (input) {
            $httpProvider.defaults.headers.common['X-CSRFToken'] = input.value;

            // bug in angular 1.0.6
            // PATCH requests use 'application/xml' content type
            // maybe will be fixed later
            $httpProvider.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
        }
    })

;