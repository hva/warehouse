angular.module('taxonomy.controllers').controller('TaxonomyAddController', function ($scope, $location, Taxonomy, TaxonomySortorder, TaxonomyUtils) {

    $scope.utils = TaxonomyUtils;
    $scope.item = new Taxonomy({parent_id: null});
    $scope.taxonomy = Taxonomy.query();

    $scope.breadcrumbs = [
        {title: 'главная', url: '/'},
        {title: 'номенклатура', url: '/taxonomy'},
        {title: 'создание группы', url: $location.absUrl()}
    ];

    $scope.submit = function () {
        var item = $scope.item,
            taxonomy = $scope.taxonomy.objects;
        item.sortorder = TaxonomySortorder.getNextSortorder(item, taxonomy);
        item.$save(function () {
            $location.path('/list');
        });
    };

});