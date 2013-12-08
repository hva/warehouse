angular.module('warehouse').controller('WarehouseCardController', function ($scope, $location, urls, product, operations, contragents) {
    angular.extend($scope, {

        breadcrumbs: [
            {title: 'главная', url: '#!' + urls.warehouse.main()},
            {title: 'склад', url: '#!' + urls.warehouse.main()},
            {title: 'карточки товара', disabled: true},
            {title: product.title}
        ],

        product: product,
        operations: operations,
        contragents: contragents,

        out: function () {
            $location.path(urls.warehouse.cardOut(product.id));
        },

        in: function () {
            $location.path(urls.warehouse.cardIn(product.id));
        }

    });
});