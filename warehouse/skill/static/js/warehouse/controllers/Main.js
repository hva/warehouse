angular.module('warehouse.controllers').controller('WarehouseMainController', function ($scope, $dialog, viewsPrefix) {
    var item = {id: 1};
    var d = $dialog.dialog({
        dialogFade: false,
        resolve: {
            item: function () {
                return angular.copy(item);
            }
        }
    });
    d.open(viewsPrefix + 'edit.html', 'WarehouseEditController');
});