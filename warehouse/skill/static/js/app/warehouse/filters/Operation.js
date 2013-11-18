angular.module('warehouse.filters')

    // resolve contragent name
    .filter('contragentName', function () {
        return function (operation, contragents) {
            return _.findWhere(contragents, {id: operation.contragent_id}).title;
        }
    })

 ;