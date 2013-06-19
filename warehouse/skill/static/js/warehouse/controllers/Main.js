angular.module('warehouse.controllers').controller('WarehouseMainController', function ($scope, $location, Taxonomy, Sortorder) {

    angular.extend($scope, {

        sortorder: Sortorder,

        breadcrumbs: [
            {title: 'главная', url: '/'},
            {title: 'склад', url: '/warehouse'}
        ],

        selectedTaxonomy: null,

        selectTaxonomy: function (x) {
            $scope.selectedTaxonomy = x;
        },

        isTaxonomyActive: function (x) {
            return angular.equals(x, $scope.selectedTaxonomy);
        },

        addProduct: function () {
            var loc = $location.path('/add');
            if ($scope.selectedTaxonomy !== null) {
                loc.search({parent_id: $scope.selectedTaxonomy.id});
            }

        }
    });


    Taxonomy.query(function (d) {
        $scope.taxonomy = d.objects;
    });

});