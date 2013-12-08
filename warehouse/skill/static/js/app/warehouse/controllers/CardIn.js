angular.module('warehouse').controller('WarehouseCardInController', function ($scope, $location, urls, product, contragents, Operation, OPERATION_TYPE) {

    angular.extend($scope, {

        breadcrumbs: [
            {title: 'главная', url: '#!' + urls.main()},
            {title: 'склад', url: '#!' + urls.main()},
            {title: 'карточки товара', disabled: true},
            {title: product.title, url: '#!' + urls.card(product.id)},
            {title: 'добавление'}
        ],

        contragents: contragents,
        operation: new Operation({
            product_id: product.id,
            type: OPERATION_TYPE.IN,
            weight: 0,
            len: 0
        }),
        product: product,

        submit: function () {
            if ($scope.form.$invalid) {
                $scope.showErrors = true;
                return;
            }
            $scope.operation.$save($scope.cancel);
        },

        cancel: function () {
            $location.path(urls.card(product.id));
        }

    });
});