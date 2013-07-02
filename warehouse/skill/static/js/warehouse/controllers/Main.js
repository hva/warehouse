angular.module('warehouse').controller('WarehouseMainController', function ($scope, $location, $routeParams, Sortorder, Product, taxonomy, products) {

    angular.extend($scope, {

        sortorder: Sortorder,
        breadcrumbs: [
            {title: 'главная', url: '/'},
            {title: 'склад'}
        ],

        // taxonomy

        taxonomy: taxonomy,
        selectedTaxonomy: _.findWhere(taxonomy, {id: parseInt($routeParams.gid, 10)}) || null,

        selectTaxonomy: function (x) {
            $scope.selectedTaxonomy = x;
        },

        isTaxonomyActive: function (x) {
            return angular.equals(x, $scope.selectedTaxonomy);
        },

        // products

        products: products || [],
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