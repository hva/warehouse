angular.module('warehouse').controller('WarehouseAddController', function ($scope, $location, $routeParams, Sortorder, taxonomy, Product) {

    var groupId = parseInt($routeParams.gid, 10) || null;

    angular.extend($scope, {

        utils: Sortorder,
        taxonomy: taxonomy,
        item: new Product({taxonomy_id: groupId, price: 0, weight: 0}),

        breadcrumbs: [
            {title: 'главная', url: '/'},
            {title: 'склад', url: '#/main'},
            {title: 'добавление позиции'}
        ],

        submit: function () {
            console.log($scope.item);
            return;
            $scope.item.$save(function () {
                $location.path('/main');
            });
        },

        cancel: function () {
            var loc = $location.path('/main');
            if (groupId !== null) {
                loc.search({gid: groupId});
            }
        }

    });

});