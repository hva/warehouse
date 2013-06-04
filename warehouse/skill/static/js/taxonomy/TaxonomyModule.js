var taxonomyServices = angular.module('taxonomy.services', ['ngResource']);
var taxonomyControllers = angular.module('taxonomy.controllers', []);
var taxonomyDirectives = angular.module('taxonomy.directives', []);

var taxonomy = angular.module('taxonomy', ['taxonomy.services','taxonomy.controllers', 'taxonomy.directives']);

taxonomy.constant('viewsPrefix', '/static/js/taxonomy/views/');

taxonomy.config(function($routeProvider, viewsPrefix) {
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
});

taxonomy.config(function($httpProvider) {
    var input = document.querySelector('input[name=csrfmiddlewaretoken]');
    if (input) {
        $httpProvider.defaults.headers.common['X-CSRFToken'] = input.value;
    }
});