angular.module('taxonomy.controllers').controller('TaxonomyListController', function ($scope, $location, Taxonomy) {

    function loadList() {
        Taxonomy.query(function (d) {
            $scope.taxonomy = d.objects;
            $scope.selected = null;
        });
    }

    loadList();

    $scope.breadcrumbs = [
        {title: 'главная', url: '/'},
        {title: 'номенклатура', url: '/taxonomy'}
    ];

    $scope.select = function (x) {
        $scope.selected = x;
    };

    $scope.isRowSelected = function (x) {
        return $scope.selected === x;
    };

    $scope.canEdit = function () {
        return $scope.selected !== null;
    };

    $scope.edit = function () {
        $location.path('/edit/' + $scope.selected.id);
    };

    $scope.remove = function () {
        var message = "Группа '" + $scope.selected.title + "' будет удалена\nВы уверены?";
        if (confirm(message)) {
            Taxonomy.remove({id: $scope.selected.id}, loadList);
        }
    };

});