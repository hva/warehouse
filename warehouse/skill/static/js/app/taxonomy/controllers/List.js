angular.module('taxonomy').controller('TaxonomyListController', function ($scope, $location, urls, Taxonomy, Sortorder, taxonomy) {

    $scope.sortorder = Sortorder;

    function loadList() {
        Taxonomy.query(function (d) {
            $scope.taxonomy = d.objects;
            $scope.selected = null;
        });
    }

    $scope.taxonomy = taxonomy;
    $scope.selected = null;

    $scope.breadcrumbs = [
        {title: 'главная', url: '#!' + urls.warehouse.main()},
        {title: 'номенклатура'},
    ];

    $scope.select = function (x) {
        $scope.selected = x;
    };

    $scope.isRowSelected = function (x) {
        return $scope.selected === x;
    };

    $scope.add = function () {
        var loc = $location.path(urls.taxonomy.add());
        if ($scope.selected !== null) {
            loc.search({pid: $scope.selected.id});
        }
    };

    $scope.hasSelection = function () {
        return $scope.selected !== null;
    };

    $scope.edit = function () {
        $location.path(urls.taxonomy.edit($scope.selected.id));
    };

    $scope.remove = function () {
        var message = "Группа '" + $scope.selected.title + "', а так же все её подгруппы и товарные позиции будут удалены!\n\nВы уверены?";
        if (confirm(message)) {
            Taxonomy.remove({id: $scope.selected.id}, loadList);
        }
    };

    $scope.moveUp = function () {
        var modified = Sortorder.moveUp($scope.selected, $scope.taxonomy);
        Taxonomy.update({objects: modified}, loadList);
    }

    $scope.moveDown = function () {
        var modified = Sortorder.moveDown($scope.selected, $scope.taxonomy);
        Taxonomy.update({objects: modified}, loadList);
    }

});