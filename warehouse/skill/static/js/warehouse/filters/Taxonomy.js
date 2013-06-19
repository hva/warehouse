angular.module('wh.warehouse.taxonomyFilter', [])
    .filter('taxonomyFilter', function (Sortorder) {
        return function (taxonomy, selected) {

            if (!taxonomy) {
                return [];
            }

            return _.filter(taxonomy, function (x) {
                // always show 0-level items
                if (x.parent_id === null) {
                    return true;
                }

                if (selected !== null) {

                    // show selected and it's parents
                    if (selected.sortorder.indexOf(x.sortorder) === 0) {
                        return true;
                    }

                    // show +1 level of selected children
                    if (x.sortorder.indexOf(selected.sortorder) === 0) {
                        var selectedLevel = Sortorder.getLevel(selected),
                            currentLevel = Sortorder.getLevel(x);
                        if (selectedLevel + 1 === currentLevel) {
                            return true;
                        }
                    }

                }

                return false;
            });
        }
    }
);