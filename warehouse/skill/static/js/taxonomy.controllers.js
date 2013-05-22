taxonomyControllers.controller('TaxonomyListController', function($scope, $location, Taxonomy) {

    Taxonomy.query(function(d) {
        $scope.taxonomy = d.objects;
    });

    $scope.breadcrumbs = [
        {title: 'главная', url: '/'},
        {title: 'номенклатура', url: '/taxonomy'}
    ];

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
        $location.path('/edit/' + $scope.selected.id);
    };

});

taxonomyControllers.controller('TaxonomyEditController', function($scope, $location, $routeParams, Taxonomy) {

    Taxonomy.get({id: $routeParams.id}, function(t) {
        $scope.item = t;
    });

    $scope.breadcrumbs = [
        {title: 'главная', url: '/'},
        {title: 'номенклатура', url: '/taxonomy'},
        {title: 'редактор', url: $location.absUrl()}
    ];

    $scope.submit = function() {
        $scope.item.$update();
    };

});