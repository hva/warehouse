taxonomyControllers.controller('TaxonomyEditController', function($scope, $location, $routeParams, $q, Taxonomy, Sortorder) {

    var getSingle = Taxonomy.get({id: $routeParams.id}),
        getList = Taxonomy.query();

    $q.all([getSingle, getList]).then(function(d) {
        $scope.item = d[0];
        $scope.taxonomy = d[1];
    });

    $scope.breadcrumbs = [
        {title: 'главная', url: '/'},
        {title: 'номенклатура', url: '/taxonomy'},
        {title: 'редактирование группы', url: $location.absUrl()}
    ];

    $scope.submit = function() {
        var item = $scope.item;
        if (item.parent_id === '') {
            item.parent_id = null;
        }
        item.sortorder = Sortorder.next();
        item.$update(function() {
            $location.path('/list');
        });
    };

});