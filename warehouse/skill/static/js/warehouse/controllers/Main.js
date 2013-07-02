angular.module('warehouse').controller('WarehouseMainController', function ($scope, $location, $routeParams, Sortorder, taxonomy, products) {

    angular.extend($scope, {

        sortorder: Sortorder,
        taxonomy: taxonomy,
        selectedTaxonomy: _.findWhere(taxonomy, {id: parseInt($routeParams.gid, 10)}) || null,

        products: products,
        selectedProduct: null,
        selectProduct: function (p) {
            if (!$scope.isProductSelected(p)) {
                $scope.selectedProduct = p;
            }
        },
        isProductSelected: function (p) {
            return angular.equals(p, $scope.selectedProduct);
        },
        editProduct: function(p) {
            $location.path('/edit/' + p.id);
        },

        breadcrumbs: [
            {title: 'главная', url: '/'},
            {title: 'склад'}
        ],

        selectTaxonomy: function (x) {
            $scope.selectedTaxonomy = x;
        },

        isTaxonomyActive: function (x) {
            return angular.equals(x, $scope.selectedTaxonomy);
        },

        addProduct: function () {
            var loc = $location.path('/add');
            if ($scope.selectedTaxonomy !== null) {
                loc.search({gid: $scope.selectedTaxonomy.id});
            }
        }

    });
});