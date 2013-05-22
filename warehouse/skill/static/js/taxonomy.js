var taxonomyServices = angular.module('taxonomy.services', ['ngResource']);
var taxonomyControllers = angular.module('taxonomy.controllers', []);
var taxonomyDirectives = angular.module('taxonomy.directives', []);

var taxonomy = angular.module('taxonomy', ['taxonomy.services','taxonomy.controllers', 'taxonomy.directives']);

taxonomy.config(function($routeProvider) {
    $routeProvider.when('/list', {
        templateUrl: '/static/partials/taxonomy/list.html',
        controller: 'TaxonomyListController'
    });
    $routeProvider.when('/edit/:id', {
        templateUrl: '/static/partials/taxonomy/edit.html',
        controller: 'TaxonomyEditController'
    });
    $routeProvider.otherwise({redirectTo: '/list'});
});

taxonomy.config(function($httpProvider) {
    $httpProvider.defaults.headers.put['X-CSRFToken'] = document.querySelector('input[name=csrfmiddlewaretoken]').value;
});