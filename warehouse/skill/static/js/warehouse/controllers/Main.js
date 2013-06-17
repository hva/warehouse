angular.module('warehouse.controllers').controller('WarehouseMainController', function ($scope) {

    $scope.breadcrumbs = [
        {title: 'главная', url: '/'},
        {title: 'склад', url: '/warehouse'}
    ];

});