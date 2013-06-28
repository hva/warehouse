angular.module('warehouse').controller('WarehouseAddController', function ($scope, $location, taxonomy, parentId, Product, Sortorder) {

    angular.extend($scope, {

        utils: Sortorder,
        taxonomy: taxonomy,
        item: new Product({parent_id: parentId}),

        breadcrumbs: [
            {title: 'главная', url: '/'},
            {title: 'склад', url: '#/main'},
            {title: 'добавление позиции', url: $location.absUrl()}
        ]

    });

});