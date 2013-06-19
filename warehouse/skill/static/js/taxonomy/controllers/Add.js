angular.module('taxonomy.controllers').controller('TaxonomyAddController', function ($scope, $location, Taxonomy, Sortorder, TaxonomyUtils) {

    $scope.utils = TaxonomyUtils;
    $scope.item = new Taxonomy({parent_id: $location.search().parent_id || null});
    $scope.taxonomy = Taxonomy.query();

    $scope.breadcrumbs = [
        {title: 'главная', url: '/'},
        {title: 'номенклатура', url: '/taxonomy'},
        {title: 'создание группы', url: $location.absUrl()}
    ];

    $scope.isDisabledItem = function (x) {
        return Sortorder.getLevel(x) >= Sortorder.MAX_LEVEL;
    }

    $scope.submit = function () {
        var item = $scope.item,
            taxonomy = $scope.taxonomy.objects;
        item.sortorder = Sortorder.getNextSortorder(item, taxonomy);
        item.$save(function () {
            $location.path('/list');
        });
    };

});