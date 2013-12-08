angular.module('warehouse').controller('WarehouseEditController', function ($scope, $location, urls, Sortorder, taxonomy, product, files) {

    function back() {
        $location.path(urls.warehouse.mainFiltered($scope.product.taxonomy_id));
    }

    angular.extend($scope, {

        utils: Sortorder,
        taxonomy: taxonomy,
        product: product,
        files: files,

        breadcrumbs: [
            {title: 'главная', url: '#!' + urls.warehouse.main()},
            {title: 'склад', url: '#!' + urls.warehouse.main()},
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