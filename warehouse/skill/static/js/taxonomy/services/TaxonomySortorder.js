angular.module('taxonomy.services').factory('TaxonomySortorder', function () {

    function _pad(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    function _mapSortorder(x) {
        return parseInt(x.sortorder.slice(-3), 10);
    }

    function _getNextSortorder(parent_id, taxonomy) {
        var sameLevelItems = _.where(taxonomy, {parent_id: parent_id}),
            parent = _.findWhere(taxonomy, {id: parent_id}) || { sortorder: '' },
            nextCounter = 1;

        if (sameLevelItems.length > 0) {
            nextCounter = _.chain(sameLevelItems).map(_mapSortorder).max().value() + 1;
        }

        return parent.sortorder + _pad(nextCounter, 3);
    }

    function getNextSortorder(item, taxonomy) {
        return _getNextSortorder(item.parent_id, taxonomy);
    }

    function updateBranch(modified, taxonomy, callback) {

        var newSortorder = _getNextSortorder(modified.parent_id);

        // change children's sortorder

        var children = _.filter(taxonomy, function (x) {
            return x.sortorder.indexOf(modified.sortorder) === 0
                && x.sortorder.length > modified.sortorder.length;
        });

        _.each(children, function (x) {
            x.sortorder = newSortorder + x.sortorder.slice(-3);
        });


        // change item's sortorder

        var original = _.findWhere(taxonomy, {id: modified.id});
        original.sortorder = newSortorder;

        // save all

        var modified = children; //.concat(original);
        Taxonomy.updateAll({objects: modified}, callback);
    }

    return {
        getNextSortorder: getNextSortorder,
        updateBranch: updateBranch
    };
});