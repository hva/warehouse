angular.module('warehouse.services', ['wh.shared.taxonomy', 'wh.shared.product', 'wh.shared.sortorder']);
angular.module('warehouse.controllers', []);
angular.module('warehouse.directives', ['wh.shared.breadcrumbs', 'wh.shared.busyIndicator']);
angular.module('warehouse.filters', ['wh.warehouse.taxonomyFilter']);


angular.module('warehouse', ['warehouse.services', 'warehouse.controllers', 'warehouse.filters', 'warehouse.directives'])

    .constant('viewsPrefix', '/static/js/warehouse/views/')

    .config(function ($routeProvider, viewsPrefix) {

                var taxonomyPromise = function ($q, Taxonomy) {
                        var deferred = $q.defer();
                        Taxonomy.query(function (d) {
                            deferred.resolve(d.objects);
                        });
                        return deferred.promise;
                    },
                    delay = function ($q, $timeout) {
                        var delay = $q.defer();
                        $timeout(delay.resolve, 1000);
                        return delay.promise;
                    };

                $routeProvider.when('/main', {
                    templateUrl: viewsPrefix + 'main.html',
                    controller: 'WarehouseMainController',
                    resolve: {
                        taxonomy: taxonomyPromise,
                        delay: delay
                    }
                });
                $routeProvider.when('/add', {
                    templateUrl: viewsPrefix + 'add.html',
                    controller: 'WarehouseAddController',
                    resolve: {
                        taxonomy: taxonomyPromise,
                        parentId: function ($route) {
                            return parseInt($route.current.params.pid, 10) || null;
                        },
                        delay: delay
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