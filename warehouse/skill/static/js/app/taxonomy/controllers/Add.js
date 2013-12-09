angular.module('taxonomy').controller('TaxonomyAddController', function ($scope, $location, $routeParams, urls, Taxonomy, Sortorder, taxonomy) {

    function isDisabledItem(x) {
        return Sortorder.getLevel(x) >= Sortorder.MAX_LEVEL;
    }

    function back() {
        $location.path(urls.taxonomy.main());
    }

    // trying to fix <option selected disabled /> issue
    function initItem() {
        var pid = parseInt($routeParams.pid, 10) || null;
        if (pid !== null) {
            var parent = _.findWhere(taxonomy, {id: pid}) || null;
            if (parent === null || isDisabledItem(parent)) {
                pid = null;
            }
        }
        return new Taxonomy({parent_id: pid});
    }

    $scope.utils = Sortorder;
    $scope.taxonomy = taxonomy;
    $scope.item = initItem();

    $scope.breadcrumbs = [
        {title: 'главная', url: '#!' + urls.warehouse.main()},
        {title: 'номенклатура', url: '#!' + urls.taxonomy.main()},
        {title: 'создание группы'}
    ];

    $scope.isDisabledItem = isDisabledItem;

    $scope.submit = function () {
        var item = $scope.item,
            taxonomy = $scope.taxonomy;
        item.sortorder = Sortorder.getNextSortorder(item, taxonomy);
        item.$save(function () {
            $location.path(urls.taxonomy.main());
        });
    };

    $scope.cancel = back;

});