angular.module('taxonomy.services').factory('TaxonomyUtils', function (TaxonomySortorder) {

    var DIGITS = TaxonomySortorder.DIGITS;

    return {

        indentTitle: function (x) {
            if (x.sortorder) {
                var level = (x.sortorder.length / DIGITS) - 1,
                    indent = level * DIGITS;
                return new Array(indent + 1).join('\u00a0') + x.title;
            }
            return x.title;
        },

        getMargin: function (x) {
            if (x.sortorder) {
                return (x.sortorder.length / DIGITS) - 1;
            }
            return 0;
        }
    }

});