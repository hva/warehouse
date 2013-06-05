angular.module('taxonomy.services').factory('TaxonomyUtils', function () {

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

    function nextSortorder(item, taxonomy) {
        var sameLevelItems = _.filter(taxonomy, function (x) {
                return x.parent_id === item.parent_id;
            }),

            parent = _.find(taxonomy, function (x) {
                return x.id === item.parent_id;
            }) || { sortorder: '' },

            max = 0;

        if (sameLevelItems.length > 0) {
            max = _.chain(sameLevelItems).map(_mapSortorder).max().value();
        }

        return parent.sortorder + _pad(max + 1, 3);
    }

    function indentTitle(x) {
        var level = (x.sortorder.length / 3) - 1,
            indent = level * 3;
        return new Array(indent + 1).join('\u00a0') + x.title;
    }

    return {
        nextSortorder: nextSortorder,
        indentTitle: indentTitle
    };
});