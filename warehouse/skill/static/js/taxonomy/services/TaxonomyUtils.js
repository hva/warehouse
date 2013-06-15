angular.module('taxonomy.services').factory('TaxonomyUtils', function (TaxonomySortorder) {

    var getLevel = TaxonomySortorder.getLevel;

    return {

        indentTitle: function (x) {
            if (x.sortorder) {
                var level = getLevel(x),
                    indent = level * 4;
                return new Array(indent + 1).join('\u00a0') + x.title;
            }
            return x.title;
        }

    }

});