angular.module('taxonomy.controllers').controller('TaxonomyEditController', function ($scope, $location, $routeParams, $timeout, Taxonomy, TaxonomyUtils, TaxonomySortorder) {

    var original;

    function isDisabledItem(x) {
        return x.sortorder.indexOf($scope.item.sortorder) === 0;
    }

    function disableOptions() {
        $('select option').each(function () {
            var option = $(this),
                val = option.val();
            if (val !== '') {
                var item = $scope.taxonomy.objects[val];
                option.attr('disabled', isDisabledItem(item));
            }
        });
    }

    $scope.utils = TaxonomyUtils;

    $scope.item = Taxonomy.get({id: $routeParams.id}, function (i) {
        original = angular.copy(i);
    });

    $scope.taxonomy = Taxonomy.query(function () {
        // wait for template render and disable some options
        $timeout(disableOptions, 0);
    });

    $scope.breadcrumbs = [
        {title: 'главная', url: '/'},
        {title: 'номенклатура', url: '/taxonomy'},
        {title: 'редактирование группы', url: $location.absUrl()}
    ];

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