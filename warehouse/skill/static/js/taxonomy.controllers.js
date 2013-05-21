taxonomyControllers.controller('TaxonomyListController', function($scope, Taxonomy) {
    $scope.breadcrumbs = {
        'главная': '/',
        'номенклатура': '/taxonomy'
    };

    // Taxonomy.query(function(d) {
    //     $scope.taxonomy = d.objects;
    // });
    $scope.taxonomy = [
        {title: 'title1'},
        {title: 'title2'}
    ];
});