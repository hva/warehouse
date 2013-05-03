var taxonomyService = angular.module('taxonomy.service', ['ngResource']);

taxonomyService.factory('Taxonomy', function ($resource) {
    return $resource('/api/v1/taxonomy/:id/', { id: '@id' });
});