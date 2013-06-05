angular.module('taxonomy.services').factory('TaxonomySortorder', function () {

    function _pad(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    function _mapSortorder(x) {
        var str = x.sortorder,
            last = str.substr(str.length - 3);
        return parseInt(last, 10);
    }

    function updateBranch(item, taxonomy, callback) {

        var sameLevelItems = _.where(taxonomy, {parent_id: item.parent_id}),
            parent = _.findWhere(taxonomy, {id: item.parent_id}) || { sortorder: '' },
            nextCounter = 1;

        if (sameLevelItems.length > 0) {
            nextCounter = _.chain(sameLevelItems).map(_mapSortorder).max().value() + 1;
        }

        var newSortorder = parent.sortorder + _pad(nextCounter, 3),
            children = _.filter(taxonomy, function(x) {
                return x.sortorder.indexOf(item.sortorder) === 0
                    && x.sortorder.length > item.sortorder.length;
            });

        console.log(item.sortorder, newSortorder);
        console.log(children);
    }

    return {
        updateBranch: updateBranch
    };
});