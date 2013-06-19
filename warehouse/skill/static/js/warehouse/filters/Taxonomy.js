angular.module('wh.warehouse.taxonomyFilter', [])
    .filter('taxonomyFilter', function (Sortorder) {
        return function (taxonomy, selected) {

            var DIGITS = Sortorder.DIGITS,
                getLevel = Sortorder.getLevel,
                isTheSameBranch = function (x, y) {
                    return x.sortorder.slice(0, DIGITS) === y.sortorder.slice(0, DIGITS);
                };

            if (!taxonomy) {
                return [];
            }

            return _.filter(taxonomy, function (x) {
                // always show 0-level items
                if (x.parent_id === null) {
                    return true;
                }

                if (selected !== null && isTheSameBranch(x, selected)) {

                    // items to the 'left'
                    var selectedLevel = getLevel(selected),
                        currentLevel =getLevel(x);
                    if (currentLevel <= selectedLevel) {
                        return true;
                    }

                    // only +1 level children to the 'right'
                    return x.sortorder.indexOf(selected.sortorder) === 0
                        && currentLevel === selectedLevel + 1;
                }

                return false;
            });
        }
    }
);