angular.module('wh.shared.promise', [])

    .provider('promise', function () {
        return {
            // making angular happy
            $get: angular.noop,

            // fake promise to emulate long running requests
            // $routeProvider.when('...', {
            //     resolve: {
            //         delay: promiseProvider.delay
            //     }
            // })

            delay: function ($q, $timeout) {
                var delay = $q.defer();
                $timeout(delay.resolve, 500);
                return delay.promise;
            },


            // resource query promise
            // params:
            //     resourceName - {string} - name of the resource to be injected
            //
            // example:
            // $routeProvider.when('...', {
            //     resolve: {
            //         objects: promiseProvider.query('ResourceName')
            //     }
            // })
            query: function (resourceName) {
                var func = function ($q, resource) {
                    var deferred = $q.defer();
                    resource.query(
                        function (d) {
                            deferred.resolve(d.objects);
                        },
                        deferred.reject
                    );
                    return deferred.promise;
                };
                func.$inject = ['$q', resourceName];
                return func;
            },

            // resource get promise ('id' will be taken from $routeParams)
            // params:
            //     resourceName - {string} - name of the resource to be injected
            //
            //example:
            // $routeProvider.when('...', {
            //     resolve: {
            //         object: promiseProvider.get('ResourceName')
            //     }
            // })
            get: function (resourceName) {
                var func = function ($q, $route, resource) {
                    var deferred = $q.defer(),
                        id = $route.current.params.id;
                    resource.get({id: id}, deferred.resolve, deferred.reject);
                    return deferred.promise;
                };
                func.$inject = ['$q', '$route', resourceName];
                return func;
            },

            // returns all operations for the product with route ':id'
            cardOperations: function ($q, $route, Operation) {
                var d = $q.defer(),
                    pid = parseInt($route.current.params.id, 10);

                Operation.query({product_id: pid},
                    function (data) {
                        d.resolve(data.objects);
                    },
                    d.reject
                );

                return d.promise;
            },

            warehouseMainFiltered: function ($q, $route, Taxonomy, Product) {
                var deferred = $q.defer(),
                    taxonomyId = parseInt($route.current.params.gid, 10);
                Taxonomy.query(function (d) {
                    var taxonomy = d.objects,
                        selectedTaxonomy = _.findWhere(taxonomy, {id: taxonomyId}),
                        ids = _.chain(taxonomy)
                            .filter(function (z) {
                                return z.sortorder.indexOf(selectedTaxonomy.sortorder) === 0;
                            })
                            .pluck('id')
                            .value()
                            .join(',');
                    Product.query({taxonomy_id__in: ids}, function (p) {
                        deferred.resolve([taxonomy, p.objects, selectedTaxonomy]);
                    });
                });
                return deferred.promise;
            },

            warehouseMain: function ($q, Taxonomy, Product) {
                var d1 = $q.defer(),
                    d2 = $q.defer();
                Taxonomy.query(function (x) {
                    d1.resolve(x.objects);
                });
                Product.query(function (x) {
                    d2.resolve(x.objects);
                });
                return $q.all([d1.promise, d2.promise]);
            }

        }
    })

;