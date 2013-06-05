angular.module('taxonomy.services').factory('TaxonomyUtils', function () {

    return {
        indentTitle: function (x) {
            var level = (x.sortorder.length / 3) - 1,
                indent = level * 3;
            return new Array(indent + 1).join('\u00a0') + x.title;
        }
    }

});