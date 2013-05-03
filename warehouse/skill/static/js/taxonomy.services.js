taxonomyServices.factory('Taxonomy', ['$resource', function ($resource) {
    return $resource('/api/v1/taxonomy/:id/', { id: '@id' });
}]);