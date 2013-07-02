angular.module('warehouse').controller('WarehouseEditController', function ($scope, $location, Sortorder, taxonomy, product) {

    angular.extend($scope, {

        utils: Sortorder,
        taxonomy: taxonomy,
        item: product,

        breadcrumbs: [
            {title: 'главная', url: '/'},
            {title: 'склад', url: '#/main'},
            {title: product.title}
        ],

        submit: function () {
            $scope.item.$update(function () {
                $location.path('/main');
            });
        },

        cancel: function () {
            $location.path('/main');
        }

    });

});