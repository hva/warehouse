angular.module('wh.shared.resource', ['ngResource'])

    .factory('Taxonomy', ['$resource', '$q', function ($resource) {
        return $resource('/api/v1/taxonomy/:id/', { id: '@id' }, {
            'query': {method: 'GET', params: {order_by: 'sortorder', limit: 0}, isArray: false},
            'update': {method: 'PATCH'}
        });
    }])

    .factory('Product', ['$resource', function ($resource) {
        return $resource('/api/v1/product/:id/', { id: '@id' }, {
            'query': {method: 'GET', params: {limit: 0}, isArray: false},
            'update': {method: 'PATCH'}
        });
    }])

    .factory('Contragent', ['$resource', function ($resource) {
        return $resource('/api/v1/contragent/:id/', { id: '@id' }, {
            'query': {method: 'GET', params: {limit: 0}, isArray: false},
            'update': {method: 'PATCH'}
        });
    }])

    .factory('Operation', ['$resource', function ($resource) {
        return $resource('/api/v1/operation/:id/', { id: '@id' }, {
            'query': {method: 'GET', params: {limit: 0, order_by: 'title'}, isArray: false},
            'update': {method: 'PATCH'}
        });
    }])

;