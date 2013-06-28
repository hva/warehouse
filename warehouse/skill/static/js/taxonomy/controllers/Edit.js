angular.module('taxonomy').controller('TaxonomyEditController', function ($scope, $location, $routeParams, Taxonomy, Sortorder, taxonomy) {

    var original;

    $scope.utils = Sortorder;

    $scope.item = Taxonomy.get({id: $routeParams.id}, function (i) {
        original = angular.copy(i);
    });

    $scope.taxonomy = taxonomy;

    $scope.breadcrumbs = [
        {title: 'главная', url: '/'},
        {title: 'номенклатура', url: '#/list'},
        {title: 'редактирование группы'}
    ];

    $scope.isDisabledItem = function (x) {
        return (x.sortorder.indexOf($scope.item.sortorder) === 0)
            || (Sortorder.getLevel(x) >= Sortorder.MAX_LEVEL);
    }

    $scope.submit = function () {
        var item = $scope.item,
            taxonomy = $scope.taxonomy.objects,
            afterSave = function () {
                $location.path('/list');
            };
        if (original.parent_id !== item.parent_id) {
            var modified = Sortorder.moveToBranch(item, taxonomy);
            Taxonomy.update({objects: modified}, afterSave);
        } else {
            item.$update(afterSave);
        }
    };

});