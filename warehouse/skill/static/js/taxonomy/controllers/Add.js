angular.module('taxonomy').controller('TaxonomyAddController', function ($scope, $location, Taxonomy, Sortorder, taxonomy) {

    $scope.utils = Sortorder;
    $scope.item = new Taxonomy({parent_id: $location.search().parent_id || null});
    $scope.taxonomy = taxonomy;

    $scope.breadcrumbs = [
        {title: 'главная', url: '/'},
        {title: 'номенклатура', url: '#/list'},
        {title: 'создание группы'}
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