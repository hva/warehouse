angular.module('warehouse').controller('WarehouseEditController', function ($scope, $location, Sortorder, taxonomy, product, csrf_token) {

    function back() {
        $location.path('/main/' + $scope.product.taxonomy_id);
    }

    angular.extend($scope, {

        utils: Sortorder,
        taxonomy: taxonomy,
        product: product,

        csrf: csrf_token,

        breadcrumbs: [
            {title: 'главная', url: '/'},
            {title: 'склад', url: '#/main'},
            {title: product.title}
        ],

        submit: function () {
            $scope.product.$update(back);
        },

        cancel: function () {
            back();
        }

    });

});