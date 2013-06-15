angular.module('taxonomy.services').factory('TaxonomySortorder', function () {

    var DIGITS = 4;

// Private methods

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

    // returns modified children
    function _updateBranch(oldSortorder, newSortorder, taxonomy) {
        var children = _.filter(taxonomy, function (x) {
            return x.sortorder.indexOf(oldSortorder) === 0
                && x.sortorder.length > oldSortorder.length;
        });

        _.each(children, function (x) {
            x.sortorder = newSortorder + x.sortorder.slice(-DIGITS);
        });

        return children;
    }

    // returns modified items + modified children
    function _switchPlaces(item1, item2, taxonomy) {
        var set1 = _updateBranch(item1.sortorder, item2.sortorder, angular.copy(taxonomy)),
            set2 = _updateBranch(item2.sortorder, item1.sortorder, angular.copy(taxonomy)),
            tmp = item1.sortorder;
        item1.sortorder = item2.sortorder;
        item2.sortorder = tmp;
        return [item1].concat(set1).concat([item2]).concat(set2);
    }

// Public methods

    function getLevel(x) {
        if (x && x.sortorder) {
            return x.sortorder.length / DIGITS - 1;
        }
        return 0;
    }

    // item: record with modified 'parent_id'
    // returns next sortorder for the same level items
    function getNextSortorder(item, taxonomy) {
        return _getNextSortorder(item.parent_id, taxonomy);
    }

    // item: record with modified 'parent_id'
    // returns record with new sortorder + modified children
    function moveToBranch(item, taxonomy) {
        var newSortorder = _getNextSortorder(item.parent_id, taxonomy);
        var modifiedChildren = _updateBranch(item.sortorder, newSortorder, taxonomy);

        // change item's sortorder
        item.sortorder = newSortorder;

        return [item].concat(modifiedChildren);
    }

    function canMoveUp(item, taxonomy) {
        if (!item) {
            return false;
        }
        var curNum = _mapSortorder(item),
            minNum = _.chain(taxonomy).where({parent_id: item.parent_id}).map(_mapSortorder).min().value();
        return curNum > minNum;
    }

    function canMoveDown(item, taxonomy) {
        if (!item) {
            return false;
        }
        var curNum = _mapSortorder(item),
            maxNum = _.chain(taxonomy).where({parent_id: item.parent_id}).map(_mapSortorder).max().value();
        return curNum < maxNum;
    }

    function moveUp(item, taxonomy) {
        var sameLevelItems = _.where(taxonomy, {parent_id: item.parent_id}),
            curIndex = _.indexOf(sameLevelItems, item),
            prevItem = sameLevelItems[curIndex - 1];
        return _switchPlaces(item, prevItem, taxonomy);
    }

    function moveDown(item, taxonomy) {
        var sameLevelItems = _.where(taxonomy, {parent_id: item.parent_id}),
            curIndex = _.indexOf(sameLevelItems, item),
            prevItem = sameLevelItems[curIndex + 1];
        return _switchPlaces(item, prevItem, taxonomy);
    }

    return {
        getLevel: getLevel,
        getNextSortorder: getNextSortorder,
        moveToBranch: moveToBranch,
        canMoveUp: canMoveUp,
        canMoveDown: canMoveDown,
        moveUp: moveUp,
        moveDown: moveDown
    };
});