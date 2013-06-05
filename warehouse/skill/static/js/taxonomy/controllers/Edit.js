angular.module('taxonomy.controllers').controller('TaxonomyEditController', function ($scope, $location, $routeParams, $q, Taxonomy, TaxonomyUtils) {

    var getSingle = Taxonomy.get({id: $routeParams.id}),
        getList = Taxonomy.query();

    $q.all([getSingle, getList]).then(function (d) {
        $scope.item = d[0];
        $scope.taxonomy = d[1];
    });

    $scope.breadcrumbs = [
        {title: 'главная', url: '/'},
        {title: 'номенклатура', url: '/taxonomy'},
        {title: 'редактирование группы', url: $location.absUrl()}
    ];

    $scope.utils = TaxonomyUtils;

    $scope.submit = function () {
        var item = $scope.item,
            taxonomy = $scope.taxonomy.objects;
        item.sortorder = TaxonomyUtils.nextSortorder(item, taxonomy);
        item.$update(function () {
            $location.path('/list');
        });
    };

});