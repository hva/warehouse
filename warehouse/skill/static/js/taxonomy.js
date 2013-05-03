var taxonomyServices = angular.module('taxonomy.services', ['ngResource']);
var taxonomyControllers = angular.module('taxonomy.controllers', []);

var taxonomy = angular.module(
    'taxonomy',
    ['taxonomy.services','taxonomy.controllers'],
    function($routeProvider) {
    }
);

// taxonomy.config(function($routeProvider, TaxonomyListController) {
//     $routeProvider.when('/list', {
//         templateUrl: 'asdasd.html',
//         controller: TaxonomyListController
//     });
// });