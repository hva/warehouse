angular.module('wh.shared.taxonomy', ['ngResource'])

    .factory('Taxonomy', ['$resource', '$q', function ($resource, $q) {
        return $resource('/api/v1/taxonomy/:id/', { id: '@id' }, {
            'query': {method: 'GET', params: {order_by: 'sortorder', limit: 0}, isArray: false},
            'update': {method: 'PATCH'}
        });
    }])

;