angular.module('warehouse').controller('WarehouseMainController', function ($scope, $location, Sortorder, Product, resolve, urls) {

    angular.extend($scope, {

        sortorder: Sortorder,
        breadcrumbs: [
            {title: 'главная', url: '#!' + urls.warehouse.main() },
            {title: 'склад'}
        ],

        // taxonomy

        taxonomy: resolve[0],
        selectedTaxonomy: resolve[2] || null,

        selectTaxonomy: function (x) {
            $location.path(urls.warehouse.mainFiltered(x.id));
        },

        isTaxonomyActive: function (x) {
            return angular.equals(x, $scope.selectedTaxonomy);
        },

        // products

        products: resolve[1],
        selectedProduct: null,

        selectProduct: function (p) {
            if (!$scope.isProductSelected(p)) {
                $scope.selectedProduct = p;
            }
        },

        isProductSelected: function (p) {
            return angular.equals(p, $scope.selectedProduct);
        },

        editProduct: function () {
            var url = urls.warehouse.edit($scope.selectedProduct.id);
            $location.path(url);
        },

        canEditProduct: function () {
            return $scope.selectedProduct !== null;
        },

        addProduct: function () {
            var loc = $location.path(urls.warehouse.add());
            if ($scope.selectedTaxonomy !== null) {
                loc.search({gid: $scope.selectedTaxonomy.id});
            }
        },

        removeProduct: function () {
            var p = $scope.selectedProduct,
                message = "Товарная позиция '" + p.title + "' будет удалена!\n\nВы уверены?";
            if (confirm(message)) {
                Product.remove({id: p.id}, function () {
                    $scope.selectedProduct = null;
                    $scope.products = _.without($scope.products, p);
                });
            }
        },

        showProductCard: function (p) {
            $location.path(urls.warehouse.card(p.id));
        }

    });
});