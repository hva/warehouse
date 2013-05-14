'use strict';


taxonomyControllers.controller('TaxonomyListController', function($scope, Taxonomy) {
    $scope.breadcrumbs = {
        'главная': '/',
        'номенклатура': '/taxonomy'
    }
});