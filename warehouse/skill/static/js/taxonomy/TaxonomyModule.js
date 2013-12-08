angular.module('taxonomy.services', ['wh.shared.resource', 'wh.shared.sortorder']);
angular.module('taxonomy.directives', ['wh.shared.breadcrumbs', 'wh.shared.optionsDisabled', 'wh.shared.busyIndicator', 'wh.shared.form']);
angular.module('taxonomy.providers', ['wh.shared.promise', 'wh.shared.urls']);

angular.module('taxonomy', ['taxonomy.services', 'taxonomy.directives', 'taxonomy.providers'])

    .constant('templatesDir', '/static/js/taxonomy/views/')

    .constant('urls', {
        _prefix: '/taxonomy',
        main: function () {
            return this._prefix;
        },
        add: function () {
            return this._prefix + '/add';
        },
        edit: function (id) {
            if (angular.isDefined(id)) {
                return this._prefix + '/edit/' + id;
            }
            return this._prefix + '/edit/:id'
        }
    })

    .config(function ($routeProvider, templatesDir, promiseProvider, urls) {
        $routeProvider
            .when(urls.main(), {
                templateUrl: templatesDir + 'list.html',
                controller: 'TaxonomyListController',
                resolve: {
                    taxonomy: promiseProvider.query('Taxonomy')
                }
            })
            .when(urls.add(), {
                templateUrl: templatesDir + 'edit.html',
                controller: 'TaxonomyAddController',
                resolve: {
                    taxonomy: promiseProvider.query('Taxonomy')
                }
            })
            .when(urls.edit(), {
                templateUrl: templatesDir + 'edit.html',
                controller: 'TaxonomyEditController',
                resolve: {
                    item: promiseProvider.get('Taxonomy'),
                    taxonomy: promiseProvider.query('Taxonomy')
                }
            })
    })
;