angular.module('warehouse').controller('WarehouseEditController', function ($scope, $location, Sortorder, taxonomy, product, files) {

    function back() {
        $location.path('/main/' + $scope.product.taxonomy_id);
    }

    angular.extend($scope, {

        utils: Sortorder,
        taxonomy: taxonomy,
        product: product,
        files: files,

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