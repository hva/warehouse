taxonomyServices.factory('Taxonomy', ['$resource', function ($resource) {
    return $resource('/api/v1/taxonomy/:id/', { id: '@id' }, {
        'query': {method: 'GET', isArray: false},
        'update': {method: 'PUT'}
    });
}]);

taxonomyServices.factory('Sortorder', function () {

    function _filterByParentId(x) {
        return x.parent_id === this.parentId;
    }

    function _mapSortorder(x) {
        return parseInt(x.sortorder, 10);
    }

    function pad(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    function next(parent, taxonomy) {
        var parentId = (parent !== null) ? parent.id : null,
            sameLevelItems = _.filter(taxonomy, _filterByParentId, {parentId: parentId}),
            max = 0;

        if (sameLevelItems.length > 0) {
            max = _.chain(sameLevelItems).map(_mapSortorder).max().value();
        }

        return pad(max + 1, 3);
    }

    return {
        next: next
    };
});