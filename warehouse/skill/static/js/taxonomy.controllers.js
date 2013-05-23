taxonomyControllers.controller('TaxonomyListController', function($scope, $location, Taxonomy) {

    function loadList() {
        Taxonomy.query(function(d) {
            $scope.taxonomy = d.objects;
            $scope.selected = null;
        });
    }

    loadList();

    $scope.breadcrumbs = [
        {title: 'главная', url: '/'},
        {title: 'номенклатура', url: '/taxonomy'}
    ];

    $scope.select = function(x) {
        $scope.selected = x;
    };

    $scope.isRowSelected = function(x) {
        return $scope.selected === x;
    };

    $scope.canEdit = function() {
        return $scope.selected !== null;
    };

    $scope.edit = function() {
        $location.path('/edit/' + $scope.selected.id);
    };

    $scope.remove = function() {
        var message = "Группа '" + $scope.selected.title + "' будет удалена\nВы уверены?";
        if (confirm(message)) {
            Taxonomy.remove({id: $scope.selected.id}, loadList);
        }
    };

});

taxonomyControllers.controller('TaxonomyAddController', function($scope, $location, Taxonomy) {

    $scope.breadcrumbs = [
        {title: 'главная', url: '/'},
        {title: 'номенклатура', url: '/taxonomy'},
        {title: 'создание группы', url: $location.absUrl()}
    ];

    $scope.submit = function() {
        $scope.item.$save(function() {
            $location.path('/list');
        });
    };

    $scope.item = new Taxonomy();

});

taxonomyControllers.controller('TaxonomyEditController', function($scope, $location, $routeParams, Taxonomy) {

    Taxonomy.get({id: $routeParams.id}, function(t) {
        $scope.item = t;
    });

    $scope.breadcrumbs = [
        {title: 'главная', url: '/'},
        {title: 'номенклатура', url: '/taxonomy'},
        {title: 'редактирование группы', url: $location.absUrl()}
    ];

    $scope.submit = function() {
        $scope.item.$update(function() {
            $location.path('/list');
        });
    };

});