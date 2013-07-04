angular.module('warehouse.services', ['wh.shared.resource', 'wh.shared.sortorder']);
angular.module('warehouse.directives', [
    'wh.shared.breadcrumbs',
    'wh.shared.busyIndicator',
    'wh.shared.form',
    'wh.shared.format',
    'wh.shared.validate'
]);
angular.module('warehouse.filters', []);
angular.module('warehouse.providers', ['wh.shared.promise']);


angular.module('warehouse', ['warehouse.services', 'warehouse.directives', 'warehouse.filters', 'warehouse.providers'])

    .constant('viewsPrefix', '/static/js/warehouse/views/')

    .constant('OPERATION_TYPE', {
        IN: 0,
        OUT: 1
    })

    .config(function ($routeProvider, viewsPrefix, promiseProvider) {

        $routeProvider
            .when('/main/:gid', {
                templateUrl: viewsPrefix + 'main.html',
                controller: 'WarehouseMainController',
                resolve: {
                    resolve: promiseProvider.warehouseMainFiltered
                }
            })
            .when('/main', {
                templateUrl: viewsPrefix + 'main.html',
                controller: 'WarehouseMainController',
                resolve: {
                    resolve: promiseProvider.warehouseMain
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
            .when('/card/:id/out', {
                templateUrl: viewsPrefix + 'card-out.html',
                controller: 'WarehouseCardOutController',
                resolve: {
                    product: promiseProvider.get('Product'),
                    contragents: promiseProvider.query('Contragent')
                }
            })
            .when('/card/:id/in', {
                templateUrl: viewsPrefix + 'card-in.html',
                controller: 'WarehouseCardInController',
                resolve: {
                    product: promiseProvider.get('Product'),
                    contragents: promiseProvider.query('Contragent')
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