angular.module('taxonomy.services', ['ngResource']);
angular.module('taxonomy.controllers', []);
angular.module('taxonomy.directives', []);

angular.module('taxonomy', ['taxonomy.services', 'taxonomy.controllers', 'taxonomy.directives'])

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
        }
    })

;