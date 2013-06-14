angular.module('taxonomy.services').factory('TaxonomySortorder', function () {

    var DIGITS = 4;

    function _pad(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    function _mapSortorder(x) {
        return parseInt(x.sortorder.slice(-DIGITS), 10);
    }

    function _getNextSortorder(parent_id, taxonomy) {
        var sameLevelItems = _.where(taxonomy, {parent_id: parent_id}),
            parent = _.findWhere(taxonomy, {id: parent_id}) || { sortorder: '' },
            nextCounter = 1;

        if (sameLevelItems.length > 0) {
            nextCounter = _.chain(sameLevelItems).map(_mapSortorder).max().value() + 1;
        }

        return parent.sortorder + _pad(nextCounter, DIGITS);
    }

    function getNextSortorder(item, taxonomy) {
        return _getNextSortorder(item.parent_id, taxonomy);
    }

    function updateBranch(item, taxonomy) {

        var newSortorder = _getNextSortorder(item.parent_id, taxonomy);

        // change children's sortorder

        var children = _.filter(taxonomy, function (x) {
            return x.sortorder.indexOf(item.sortorder) === 0
                && x.sortorder.length > item.sortorder.length;
        });

        _.each(children, function (x) {
            x.sortorder = newSortorder + x.sortorder.slice(-DIGITS);
        });


        // change item's sortorder

        item.sortorder = newSortorder;


        // return modified items

        return children.concat(item);

    }

    // Move up/down

    function canMoveUp(item, taxonomy) {
        if (!item) {
            return false;
        }
        var curNum = _mapSortorder(item),
            minNum = _.chain(taxonomy).where({parent_id: item.parent_id}).map(_mapSortorder).min().value();
        console.log(minNum);
    }

    return {
        DIGITS: DIGITS,
        getNextSortorder: getNextSortorder,
        updateBranch: updateBranch,
        canMoveUp: canMoveUp
    };
});