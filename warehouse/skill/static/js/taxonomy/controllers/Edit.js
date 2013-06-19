angular.module('taxonomy.controllers').controller('TaxonomyEditController', function ($scope, $location, $routeParams, $timeout, Taxonomy, TaxonomyUtils, Sortorder) {

    var original;

    $scope.utils = TaxonomyUtils;

    $scope.item = Taxonomy.get({id: $routeParams.id}, function (i) {
        original = angular.copy(i);
    });

    $scope.taxonomy = Taxonomy.query();

    $scope.breadcrumbs = [
        {title: 'главная', url: '/'},
        {title: 'номенклатура', url: '/taxonomy'},
        {title: 'редактирование группы', url: $location.absUrl()}
    ];

    $scope.isDisabledItem = function (x) {
        return x.sortorder.indexOf($scope.item.sortorder) === 0;
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