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
        if (original.parent_id !== item.parent_id) {
            var modified = TaxonomySortorder.updateBranch(item, taxonomy);
            Taxonomy.update({objects: modified}, afterSave);
        } else {
            item.$update(afterSave);
        }
    };

});