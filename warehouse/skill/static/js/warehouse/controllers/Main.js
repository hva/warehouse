angular.module('warehouse.controllers').controller('WarehouseMainController', function ($scope, $location, Sortorder, taxonomy) {

    angular.extend($scope, {

        sortorder: Sortorder,

        taxonomy: taxonomy,
        selectedTaxonomy: null,

        breadcrumbs: [
            {title: 'главная', url: '/'},
            {title: 'склад', url: '/warehouse'}
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
                loc.search({pid: $scope.selectedTaxonomy.id});
            }
        }
    });

});