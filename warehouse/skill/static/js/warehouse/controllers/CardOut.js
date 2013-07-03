angular.module('warehouse').controller('WarehouseCardOutController', function ($scope, $location, product, contragents, Operation, OPERATION_TYPE) {

    angular.extend($scope, {

        breadcrumbs: [
            {title: 'главная', url: '/'},
            {title: 'склад', url: '#/main'},
            {title: 'карточки товара', disabled: true},
            {title: product.title, url: '#/card/' + product.id},
            {title: 'списание'}
        ],

        contragents: contragents,
        operation: new Operation({
            product_id: product.id,
            type: OPERATION_TYPE.OUT,
            weight: 0
        }),
        product: product,

        submit: function () {
            if ($scope.form.$invalid) {
                $scope.showErrors = true;
                return;
            }

            var op = $scope.operation;

            op.weight = -op.weight;
            op.len = -op.len;

            op.$save($scope.cancel);
        },

        cancel: function () {
            $location.path('/card/' + product.id);
        }

    });
});