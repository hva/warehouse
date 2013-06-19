angular.module('warehouse.controllers').controller('WarehouseAddController', function ($scope, $location, Taxonomy, Sortorder) {

    angular.extend($scope, {

        utils: Sortorder,

        breadcrumbs: [
            {title: 'главная', url: '/'},
            {title: 'склад', url: '/warehouse'},
            {title: 'добавление позиции', url: $location.absUrl()}
        ]

    });

    Taxonomy.query(function(d) {
        $scope.taxonomy = d.objects;
    });

});