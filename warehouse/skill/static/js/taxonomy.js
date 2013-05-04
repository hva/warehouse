var taxonomyServices = angular.module('taxonomy.services', ['ngResource']);
var taxonomyControllers = angular.module('taxonomy.controllers', []);

var taxonomy = angular.module('taxonomy', ['taxonomy.services','taxonomy.controllers']);

taxonomy.config(function($routeProvider) {
    $routeProvider.when('/list', {
        templateUrl: '/static/partials/taxonomy/list.html',
        controller: 'TaxonomyListController'
    });
    $routeProvider.otherwise({redirectTo: '/list'});
});