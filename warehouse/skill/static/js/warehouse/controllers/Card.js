angular.module('warehouse').controller('WarehouseCardController', function ($scope, product, operations, contragents) {
    angular.extend($scope, {

        breadcrumbs: [
            {title: 'главная', url: '/'},
            {title: 'склад', url: '#/main'},
            {title: 'карточки товара', disabled: true},
            {title: product.title}
        ],

        product: product,
        operations: operations,
        contragents: contragents

    });
});