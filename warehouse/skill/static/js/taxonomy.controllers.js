taxonomyControllers.controller('TaxonomyListController', function($scope, Taxonomy) {
    $scope.breadcrumbs = {
        'главная': '/',
        'номенклатура': '/taxonomy'
    };

    $scope.selectRow = function(x) {
        console.log(x);
    };

    Taxonomy.query(function(d) {
        $scope.taxonomy = d.objects;
    });
});