angular.module('wh.shared.product', ['ngResource'])

    .factory('Product', ['$resource', function ($resource) {
        return $resource('/api/v1/product/:id/', { id: '@id' }, {
            'query': {method: 'GET', params: {limit: 0}, isArray: false},
            'update': {method: 'PATCH'}
        });
    }]);