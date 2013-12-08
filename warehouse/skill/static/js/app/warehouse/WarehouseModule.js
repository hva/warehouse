angular.module('warehouse.services', [
    'wh.shared.resource',
    'wh.shared.sortorder'
]);

angular.module('warehouse.directives', [
    'wh.shared.breadcrumbs',
    'wh.shared.busyIndicator',
    'wh.shared.form',
    'wh.shared.validate'
]);
angular.module('warehouse.filters', []);
angular.module('warehouse.providers', ['wh.shared.promise']);


angular.module('warehouse', ['warehouse.services', 'warehouse.directives', 'warehouse.filters', 'warehouse.providers'])

    .constant('templatesDir', '/static/js/app/warehouse/views/')

    .constant('OPERATION_TYPE', {
        IN: 0,
        OUT: 1
    })

    .config(function ($routeProvider, promiseProvider, templatesDir) {

        var prefix = '/warehouse';

        $routeProvider
            .when(prefix + '/main/:gid', {
                templateUrl: templatesDir + 'main.html',
                controller: 'WarehouseMainController',
                resolve: {
                    resolve: promiseProvider.warehouseMainFiltered
                }
            })
            .when(prefix + '/main', {
                templateUrl: templatesDir + 'main.html',
                controller: 'WarehouseMainController',
                resolve: {
                    resolve: promiseProvider.warehouseMain
                }
            })
            .when(prefix + '/add', {
                templateUrl: templatesDir + 'add.html',
                controller: 'WarehouseAddController',
                resolve: {
                    taxonomy: promiseProvider.query('Taxonomy'),
                    contragents: promiseProvider.query('Contragent')
                }
            })
            .when(prefix + '/edit/:id', {
                templateUrl: templatesDir + 'edit.html',
                controller: 'WarehouseEditController',
                resolve: {
                    taxonomy: promiseProvider.query('Taxonomy'),
                    product: promiseProvider.get('Product'),
                    files: function($q, $route, Attachment) {
                        var d = $q.defer(),
                            id = parseInt($route.current.params.id, 10);
                        Attachment.query({item_id: id}, function(data) {
                            d.resolve(data.objects)
                        }, d.reject);
                        return d.promise;
                    }
                }
            })
            .when(prefix + '/card/:id/out', {
                templateUrl: templatesDir + 'card-out.html',
                controller: 'WarehouseCardOutController',
                resolve: {
                    product: promiseProvider.get('Product'),
                    contragents: promiseProvider.query('Contragent')
                }
            })
            .when(prefix + '/card/:id/in', {
                templateUrl: templatesDir + 'card-in.html',
                controller: 'WarehouseCardInController',
                resolve: {
                    product: promiseProvider.get('Product'),
                    contragents: promiseProvider.query('Contragent')
                }
            })
            .when(prefix + '/card/:id', {
                templateUrl: templatesDir + 'card.html',
                controller: 'WarehouseCardController',
                resolve: {
                    product: promiseProvider.get('Product'),
                    operations: promiseProvider.cardOperations,
                    contragents: promiseProvider.query('Contragent')
                }
            })
            .otherwise({redirectTo: prefix + '/main'});
    })

;