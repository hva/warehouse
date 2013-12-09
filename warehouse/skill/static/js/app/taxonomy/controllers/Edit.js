angular.module('taxonomy').controller('TaxonomyEditController', function ($scope, $location, $routeParams, urls, Taxonomy, Sortorder, item, taxonomy) {

    function back() {
        $location.path(urls.taxonomy.main());
    }

    var original = angular.copy(item);

    $scope.utils = Sortorder;

    $scope.item = item;
    $scope.taxonomy = taxonomy;

    $scope.breadcrumbs = [
        {title: 'главная', url: '#!' + urls.warehouse.main()},
        {title: 'номенклатура', url: '#!' + urls.taxonomy.main()},
        {title: 'редактирование группы'}
    ];

    $scope.isDisabledItem = function (x) {
        return (x.sortorder.indexOf($scope.item.sortorder) === 0)
            || (Sortorder.getLevel(x) >= Sortorder.MAX_LEVEL);
    }

    $scope.submit = function () {
        var item = $scope.item,
            taxonomy = $scope.taxonomy;
        if (original.parent_id !== item.parent_id) {
            var modified = Sortorder.moveToBranch(item, taxonomy);
            Taxonomy.update({objects: modified}, back);
        } else {
            item.$update(back);
        }
    };

    $scope.cancel = back;

});