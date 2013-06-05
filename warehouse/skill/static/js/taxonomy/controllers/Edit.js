angular.module('taxonomy.controllers').controller('TaxonomyEditController', function ($scope, $location, $routeParams, Taxonomy, TaxonomyUtils, TaxonomySortorder) {

    var original;

    Taxonomy.get({id: $routeParams.id}, function (i) {
        $scope.item = i;
        original = angular.copy(i);
    });

    $scope.taxonomy = Taxonomy.query();

    $scope.breadcrumbs = [
        {title: 'главная', url: '/'},
        {title: 'номенклатура', url: '/taxonomy'},
        {title: 'редактирование группы', url: $location.absUrl()}
    ];

    $scope.utils = TaxonomyUtils;

    $scope.submit = function () {
        var item = $scope.item,
            taxonomy = $scope.taxonomy.objects,
            afterSave = function () {
                $location.path('/list');
            };
        TaxonomySortorder.updateBranch(item, taxonomy, afterSave);
//        if (original.parent_id !== item.parent_id) {
//            TaxonomySortorder.updateBranch(item, taxonomy, afterSave);
//        } else {
//            item.$update(afterSave);
//        }
    };

});