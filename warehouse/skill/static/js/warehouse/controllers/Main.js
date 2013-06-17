angular.module('warehouse.controllers').controller('WarehouseMainController', function ($scope, Taxonomy) {

    $scope.breadcrumbs = [
        {title: 'главная', url: '/'},
        {title: 'склад', url: '/warehouse'}
    ];

    Taxonomy.query(function (d) {
        $scope.taxonomy = d.objects;
    });

    $scope.selectedTaxonomy = null;
    $scope.selectTaxonomy = function(x) {
        $scope.selectedTaxonomy = x;
    }

});