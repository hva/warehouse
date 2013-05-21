taxonomyControllers.controller('TaxonomyListController', function($scope, Taxonomy) {
    $scope.breadcrumbs = {
        'главная': '/',
        'номенклатура': '/taxonomy'
    };

    $scope.select = function(x) {
        $scope.selected = x;
    };

    $scope.isSelected = function(x) {
        return $scope.selected === x;
    };

    Taxonomy.query(function(d) {
        $scope.taxonomy = d.objects;
    });
});