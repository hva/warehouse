taxonomyServices.factory('Sortorder', function () {

    function _filterByParentId(x) {
        return x.parent_id === this.parent.id;
    }

    function _mapSortorder(x) {
        var str = x.sortorder,
            last = str.substr(str.length - 3);
        return parseInt(last, 10);
    }

    function _pad(n, width) {
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    }

    function next(parent, taxonomy) {
        parent = parent || {id : null, sortorder: ''};
        var sameLevelItems = _.filter(taxonomy, _filterByParentId, {parent: parent}),
            max = 0;

        if (sameLevelItems.length > 0) {
            max = _.chain(sameLevelItems).map(_mapSortorder).max().value();
        }

        return parent.sortorder + _pad(max + 1, 3);
    }

    return {
        next: next
    };
});