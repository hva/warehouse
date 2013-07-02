angular.module('warehouse').controller('WarehouseMainController', function ($scope, $location, Sortorder, Product, resolve) {

    angular.extend($scope, {

        sortorder: Sortorder,
        breadcrumbs: [
            {title: 'главная', url: '/'},
            {title: 'склад'}
        ],

        // taxonomy

        taxonomy: resolve[0],
        selectedTaxonomy: resolve[2] || null,

        selectTaxonomy: function (x) {
            $location.path('/main/' + x.id);
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