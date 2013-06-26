angular.module('warehouse.controllers').controller('WarehouseAddController', function ($scope, $location, Taxonomy, Product, Sortorder) {

    angular.extend($scope, {

        utils: Sortorder,
        item: new Product({parent_id: $location.search().parent_id || null}),

        breadcrumbs: [
            {title: 'главная', url: '/'},
            {title: 'склад', url: '/warehouse'},
            {title: 'добавление позиции', url: $location.absUrl()}
        ]

    });

    Taxonomy.query(function (d) {
        $scope.taxonomy = d.objects;
    });

});