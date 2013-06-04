taxonomyControllers.controller('TaxonomyAddController', function($scope, $location, Taxonomy, Sortorder) {

    $scope.breadcrumbs = [
        {title: 'главная', url: '/'},
        {title: 'номенклатура', url: '/taxonomy'},
        {title: 'создание группы', url: $location.absUrl()}
    ];

    $scope.submit = function() {
        var item = $scope.item,
            taxonomy = $scope.taxonomy.objects,
            parentIndex = $scope.parentIndex,
            parent = null;
        if (parentIndex > -1) {
            parent = taxonomy[parentIndex];
        }
        if (parent !== null) {
            item.parent_id = parent.id;
        }
        item.sortorder = Sortorder.next(parent, taxonomy);
        item.$save(function() {
            $location.path('/list');
        });
    };

    $scope.item = new Taxonomy();
    $scope.taxonomy = Taxonomy.query();
    $scope.parentIndex = -1;

});