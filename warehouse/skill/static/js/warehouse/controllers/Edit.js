angular.module('warehouse.controllers').controller('WarehouseEditController', function ($scope, dialog, item) {

    $scope.close = function() {
        dialog.close();
    }

//    console.log(dialog, item);
});