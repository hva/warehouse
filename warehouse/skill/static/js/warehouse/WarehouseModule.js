angular.module('warehouse.services', ['wh.shared.taxonomy', 'wh.shared.product', 'wh.shared.sortorder']);
angular.module('warehouse.directives', ['wh.shared.breadcrumbs', 'wh.shared.busyIndicator']);
angular.module('warehouse.filters', ['wh.warehouse.taxonomyFilter']);
angular.module('warehouse.providers', ['wh.shared.promise']);


angular.module('warehouse', ['warehouse.services', 'warehouse.directives', 'warehouse.filters', 'warehouse.providers'])

    .constant('viewsPrefix', '/static/js/warehouse/views/')

    .config(function ($routeProvider, viewsPrefix, promiseProvider) {

        $routeProvider.when('/main', {
            templateUrl: viewsPrefix + 'main.html',
            controller: 'WarehouseMainController',
            resolve: {
                taxonomy: promiseProvider.query,
                delay: promiseProvider.delay(500)
            }
        });
        $routeProvider.when('/add', {
            templateUrl: viewsPrefix + 'add.html',
            controller: 'WarehouseAddController',
            resolve: {
                taxonomy: promiseProvider.query,
                parentId: function ($route) {
                    return parseInt($route.current.params.pid, 10) || null;
                },
                delay: promiseProvider.delay(500)
            }
        });
        $routeProvider.otherwise({redirectTo: '/main'});
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