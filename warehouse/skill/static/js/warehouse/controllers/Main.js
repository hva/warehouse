angular.module('warehouse.controllers').controller('WarehouseMainController', function ($scope, Taxonomy, Sortorder) {

    $scope.sortorder = Sortorder;

    $scope.breadcrumbs = [
        {title: 'главная', url: '/'},
        {title: 'склад', url: '/warehouse'}
    ];

    Taxonomy.query(function (d) {
        $scope.taxonomy = d.objects;
    });

    $scope.selectedTaxonomy = null;

    $scope.selectTaxonomy = function (x) {
        $scope.selectedTaxonomy = x;
    }

    $scope.isTaxonomyActive = function (x) {
        return angular.equals(x, $scope.selectedTaxonomy);
    }

});