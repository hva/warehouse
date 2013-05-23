var taxonomyServices = angular.module('taxonomy.services', ['ngResource']);
var taxonomyControllers = angular.module('taxonomy.controllers', []);
var taxonomyDirectives = angular.module('taxonomy.directives', []);

var taxonomy = angular.module('taxonomy', ['taxonomy.services','taxonomy.controllers', 'taxonomy.directives']);

taxonomy.config(function($routeProvider) {
    $routeProvider.when('/list', {
        templateUrl: '/static/partials/taxonomy/list.html',
        controller: 'TaxonomyListController'
    });
    $routeProvider.when('/add', {
        templateUrl: '/static/partials/taxonomy/edit.html',
        controller: 'TaxonomyAddController'
    });
    $routeProvider.when('/edit/:id', {
        templateUrl: '/static/partials/taxonomy/edit.html',
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