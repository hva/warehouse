angular.module('warehouse.services', ['ngResource']);
angular.module('warehouse.controllers', []);
angular.module('warehouse.directives', []);
angular.module('warehouse.providers', []);

angular.module('warehouse', ['warehouse.services', 'warehouse.controllers', 'warehouse.directives', 'warehouse.providers'])

    .constant('viewsPrefix', '/static/js/warehouse/views/')

    .config(function ($routeProvider, viewsPrefix) {
        $routeProvider.when('/main', {
            templateUrl: viewsPrefix + 'main.html',
            controller: 'WarehouseMainController'
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