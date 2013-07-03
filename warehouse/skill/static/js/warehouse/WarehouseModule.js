angular.module('warehouse.services', ['wh.shared.resource', 'wh.shared.sortorder']);
angular.module('warehouse.directives', [
    'wh.shared.breadcrumbs',
    'wh.shared.busyIndicator',
    'wh.shared.form',
    'wh.shared.format'
]);
angular.module('warehouse.filters', []);
angular.module('warehouse.providers', ['wh.shared.promise']);


angular.module('warehouse', ['warehouse.services', 'warehouse.directives', 'warehouse.filters', 'warehouse.providers'])

    .constant('viewsPrefix', '/static/js/warehouse/views/')

    .config(function ($routeProvider, viewsPrefix, promiseProvider) {

        $routeProvider
            .when('/main/:gid', {
                templateUrl: viewsPrefix + 'main.html',
                controller: 'WarehouseMainController',
                resolve: {
                    resolve: function ($q, $route, Taxonomy, Product) {
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
                    }
                }
            })
            .when('/main', {
                templateUrl: viewsPrefix + 'main.html',
                controller: 'WarehouseMainController',
                resolve: {
                    resolve: function ($q, Taxonomy, Product) {
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
            .when('/add', {
                templateUrl: viewsPrefix + 'add.html',
                controller: 'WarehouseAddController',
                resolve: {
                    taxonomy: promiseProvider.query('Taxonomy'),
                    contragents: promiseProvider.query('Contragent')
                }
            })
            .when('/edit/:id', {
                templateUrl: viewsPrefix + 'edit.html',
                controller: 'WarehouseEditController',
                resolve: {
                    taxonomy: promiseProvider.query('Taxonomy'),
                    product: promiseProvider.get('Product')
                }
            })
            .when('/card/:id', {
                templateUrl: viewsPrefix + 'card.html',
                controller: 'WarehouseCardController',
                resolve: {
                    product: promiseProvider.get('Product'),
                    operations: promiseProvider.cardOperations,
                    contragents: promiseProvider.query('Contragent')
                }
            })
            .otherwise({redirectTo: '/main'});
    })

    .config(function ($httpProvider) {
        var input = document.getElementsByName('csrfmiddlewaretoken')[0];
        if (input) {
            $httpProvider.defaults.headers.common['X-CSRFToken'] = input.value;

            // bug in angular 1.0.6
            // PATCH requests use 'application/xml' content type
            // maybe will be fixed later
            $httpProvider.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
        }
    })

;