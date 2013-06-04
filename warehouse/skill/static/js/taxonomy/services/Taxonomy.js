angular.module('taxonomy.services').factory('Taxonomy', ['$resource', function ($resource) {
    return $resource('/api/v1/taxonomy/:id/', { id: '@id' }, {
        'query': {method: 'GET', params: {order_by: 'sortorder', limit: 0}, isArray: false},
        'update': {method: 'PUT'}
    });
}]);