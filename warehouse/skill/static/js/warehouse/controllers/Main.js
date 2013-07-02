angular.module('warehouse').controller('WarehouseMainController', function ($scope, $location, Sortorder, Product, resolve) {

    angular.extend($scope, {

        sortorder: Sortorder,
        breadcrumbs: [
            {title: 'главная', url: '/'},
            {title: 'склад'}
        ],

        // taxonomy

        taxonomy: resolve.taxonomy,
        selectedTaxonomy: resolve.selectedTaxonomy,

        selectTaxonomy: function (x) {
            $location.search({gid: x.id});
        },

        isTaxonomyActive: function (x) {
            return angular.equals(x, $scope.selectedTaxonomy);
        },

        // products

        products: resolve.products,
        selectedProduct: null,

        selectProduct: function (p) {
            if (!$scope.isProductSelected(p)) {
                $scope.selectedProduct = p;
            }
        },

        isProductSelected: function (p) {
            return angular.equals(p, $scope.selectedProduct);
        },

        editProduct: function (p) {
            $location.path('/edit/' + p.id);
        },

        canEditProduct: function () {
            return $scope.selectedProduct !== null;
        },

        addProduct: function () {
            var loc = $location.path('/add');
            if ($scope.selectedTaxonomy !== null) {
                loc.search({gid: $scope.selectedTaxonomy.id});
            }
        },

        removeProduct: function () {
            var p = $scope.selectedProduct,
                message = "Товарная позиция '" + p.title + "' будет удалена!\n\nВы уверены?";
            if (confirm(message)) {
                Product.remove({id: p.id}, function() {
                    $scope.selectedProduct = null;
                    $scope.products = _.without($scope.products, p);
                });
            }
        }

    });
});