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

taxonomyControllers.controller('TaxonomyAddController', function($scope, $location, Taxonomy, Sortorder) {

    $scope.breadcrumbs = [
        {title: 'главная', url: '/'},
        {title: 'номенклатура', url: '/taxonomy'},
        {title: 'создание группы', url: $location.absUrl()}
    ];

    $scope.submit = function() {
        var item = $scope.item,
            taxonomy = $scope.taxonomy.objects,
            parentIndex = $scope.parentIndex,
            parent = null;
        if (parentIndex > -1) {
            parent = taxonomy[parentIndex];
        }
        if (parent !== null) {
            item.parent_id = parent.id;
        }
        item.sortorder = Sortorder.next(parent, taxonomy);
        item.$save(function() {
            $location.path('/list');
        });
    };

    $scope.item = new Taxonomy();
    $scope.taxonomy = Taxonomy.query();
    $scope.parentIndex = -1;

});

taxonomyControllers.controller('TaxonomyEditController', function($scope, $location, $routeParams, $q, Taxonomy, Sortorder) {

    var getSingle = Taxonomy.get({id: $routeParams.id}),
        getList = Taxonomy.query();

    $q.all([getSingle, getList]).then(function(d) {
        $scope.item = d[0];
        $scope.taxonomy = d[1];
    });

    $scope.breadcrumbs = [
        {title: 'главная', url: '/'},
        {title: 'номенклатура', url: '/taxonomy'},
        {title: 'редактирование группы', url: $location.absUrl()}
    ];

    $scope.submit = function() {
        var item = $scope.item;
        if (item.parent_id === '') {
            item.parent_id = null;
        }
        item.sortorder = Sortorder.next();
        item.$update(function() {
            $location.path('/list');
        });
    };

});