angular.module('warehouse').controller('WarehouseCardOutController', function ($scope, product) {
    angular.extend($scope, {

        breadcrumbs: [
            {title: 'главная', url: '/'},
            {title: 'склад', url: '#/main'},
            {title: 'карточки товара', disabled: true},
            {title: product.title, url: '#/card/' + product.id},
            {title: 'списание'},
        ]

    });
});