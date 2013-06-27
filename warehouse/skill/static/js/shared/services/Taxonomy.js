angular.module('wh.shared.taxonomy', ['ngResource'])

    .factory('Taxonomy', ['$resource', '$q', function ($resource, $q) {
        var Taxonomy = $resource('/api/v1/taxonomy/:id/', { id: '@id' }, {
            'query': {method: 'GET', params: {order_by: 'sortorder', limit: 0}, isArray: false},
            'update': {method: 'PATCH'}
        });

        Taxonomy.queryPromise = function () {
            var deferred = $q.defer();
            Taxonomy.query(function (d) {
                deferred.resolve(d.objects);
            });
            return deferred.promise;

        }

        return Taxonomy;
    }]);