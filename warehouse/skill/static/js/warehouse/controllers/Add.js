angular.module('warehouse.controllers').controller('WarehouseAddController', function ($scope, $location) {

    angular.extend($scope, {

        breadcrumbs: [
            {title: 'главная', url: '/'},
            {title: 'склад', url: '/warehouse'},
            {title: 'добавление позиции', url: $location.absUrl()}
        ]

    });


});