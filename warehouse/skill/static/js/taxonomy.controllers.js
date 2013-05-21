taxonomyControllers.controller('TaxonomyListController', function($scope, $location, Taxonomy) {

    Taxonomy.query(function(d) {
        $scope.taxonomy = d.objects;
    });

    $scope.breadcrumbs = {
        'главная': '/',
        'номенклатура': '/taxonomy'
    };

    $scope.selected = null;

    $scope.select = function(x) {
        $scope.selected = x;
    };

    $scope.isRowSelected = function(x) {
        return $scope.selected === x;
    };

    $scope.canEdit = function() {
        return $scope.selected !== null;
    };

    $scope.edit = function() {
        $location.path('/edit').search({'id': $scope.selected.id});
    };

});

taxonomyControllers.controller('TaxonomyEditController', function($scope, $location, $routeParams, Taxonomy) {

    $scope.id = $routeParams.id;

});