angular.module('warehouse').controller('WarehouseCardController', function ($scope, $location, product, operations, contragents) {
    angular.extend($scope, {

        breadcrumbs: [
            {title: 'главная', url: '/'},
            {title: 'склад', url: '#/main'},
            {title: 'карточки товара', disabled: true},
            {title: product.title}
        ],

        product: product,
        operations: operations,
        contragents: contragents,

        out: function() {
            $location.path('/card/' + product.id + '/out');
        },

        in: function() {
            $location.path('/card/' + product.id + '/in');
        }

    });
});