angular.module('warehouse').controller('WarehouseAddController', function ($scope, $location, $routeParams, Sortorder, taxonomy, contragents, Product, Operation) {

    var groupId = parseInt($routeParams.gid, 10) || null;

    angular.extend($scope, {

        utils: Sortorder,

        breadcrumbs: [
            {title: 'главная', url: '/'},
            {title: 'склад', url: '#/main'},
            {title: 'добавление товара'}
        ],

        taxonomy: taxonomy,
        contragents: contragents,

        product: new Product({
            taxonomy_id: groupId,
            price: 0,
            vat: 20,
            margin: 15,
            k: 0
        }),

        operation: new Operation({
            weight: 0,
            len: 0,
            vat: 0
        }),

        submit: function () {

            if ($scope.form.$invalid) {
                $scope.showErrors = true;
                return;
            }

            var p = $scope.product,
                o = $scope.operation;

            p.$save(function (p2) {
                o.product_id = p2.id;
                o.$save(function () {
                    $location.path('/main');
                })
            });
        },

        cancel: function () {
            var path = '/main';
            if (groupId !== null) {
                path += '/' + groupId;
            }
            $location.path(path).search({});
        }

    });

});