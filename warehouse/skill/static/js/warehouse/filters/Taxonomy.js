angular.module('wh.warehouse.taxonomyFilter', [])
    .filter('taxonomyFilter', function () {
        return function (taxonomy, selected) {

            if (!taxonomy) {
                return [];
            }

            return _.filter(taxonomy, function(x) {
                if (x.parent_id === null) {
                    return true;
                }

                if (selected !== null) {
                    return x.sortorder.indexOf(selected.sortorder) === 0;
                }

            });
        }
    }
);