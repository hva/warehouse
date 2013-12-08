angular.module('warehouse').controller('WarehouseCardController', function ($scope, $location, urls, product, operations, contragents) {
    angular.extend($scope, {

        breadcrumbs: [
            {title: 'главная', url: '#!' + urls.main()},
            {title: 'склад', url: '#!' + urls.main()},
            {title: 'карточки товара', disabled: true},
            {title: product.title}
        ],

        product: product,
        operations: operations,
        contragents: contragents,

        out: function () {
            $location.path(urls.cardOut(product.id));
        },

        in: function () {
            $location.path(urls.cardIn(product.id));
        }

    });
});