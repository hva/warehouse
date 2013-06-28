angular.module('warehouse').controller('WarehouseAddController', function ($scope, $location, $routeParams, Sortorder, taxonomy, Product) {

    var parentId = parseInt($routeParams.gid, 10) || null;

    angular.extend($scope, {

        utils: Sortorder,
        taxonomy: taxonomy,
        item: new Product({parent_id: parentId}),

        breadcrumbs: [
            {title: 'главная', url: '/'},
            {title: 'склад', url: '#/main'},
            {title: 'добавление позиции'}
        ],

        cancel: function () {
            var loc = $location.path('/main');
            if (parentId !== null) {
                loc.search({gid: parentId});
            }
        }

    });

});