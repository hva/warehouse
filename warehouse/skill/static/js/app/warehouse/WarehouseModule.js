angular.module('warehouse.services', [
    'wh.shared.resource',
    'wh.shared.sortorder'
]);

angular.module('warehouse.directives', [
    'wh.shared.breadcrumbs',
    'wh.shared.busyIndicator',
    'wh.shared.form',
    'wh.shared.validate'
]);
angular.module('warehouse.filters', []);
angular.module('warehouse.providers', ['wh.shared.promise']);


angular.module('warehouse', ['warehouse.services', 'warehouse.directives', 'warehouse.filters', 'warehouse.providers'])

    .constant('templatesDir', '/static/js/app/warehouse/views/')

    .constant('OPERATION_TYPE', {
                  IN: 0,
                  OUT: 1
              })

    .constant('urls', {
                  _prefix: '/warehouse',
                  main: function () {
                      return this._prefix + '/main'
                  },
                  mainFiltered: function (gid) {
                      if (angular.isDefined(gid)) {
                          return this._prefix + '/main/' + gid;
                      }
                      return this._prefix + '/main/:gid'
                  },
                  add: function () {
                      return this._prefix + '/add'
                  },
                  edit: function (id) {
                      if (angular.isDefined(id)) {
                          return this._prefix + '/edit/' + id;
                      }
                      return this._prefix + '/edit/:id'
                  },
                  card: function (id) {
                      if (angular.isDefined(id)) {
                          return this._prefix + '/card/' + id;
                      }
                      return this._prefix + '/card/:id'
                  },
                  cardOut: function (id) {
                      if (angular.isDefined(id)) {
                          return this._prefix + '/card/' + id + '/out';
                      }
                      return this._prefix + '/card/:id/out'
                  },
                  cardIn: function (id) {
                      if (angular.isDefined(id)) {
                          return this._prefix + '/card/' + id + '/in';
                      }
                      return this._prefix + '/card/:id/in'
                  }
              })

    .config(function ($routeProvider, promiseProvider, templatesDir, urls) {

                $routeProvider
                    .when(urls.mainFiltered(), {
                              templateUrl: templatesDir + 'main.html',
                              controller: 'WarehouseMainController',
                              resolve: {
                                  resolve: promiseProvider.warehouseMainFiltered
                              }
                          })
                    .when(urls.main(), {
                              templateUrl: templatesDir + 'main.html',
                              controller: 'WarehouseMainController',
                              resolve: {
                                  resolve: promiseProvider.warehouseMain
                              }
                          })
                    .when(urls.add(), {
                              templateUrl: templatesDir + 'add.html',
                              controller: 'WarehouseAddController',
                              resolve: {
                                  taxonomy: promiseProvider.query('Taxonomy'),
                                  contragents: promiseProvider.query('Contragent')
                              }
                          })
                    .when(urls.edit(), {
                              templateUrl: templatesDir + 'edit.html',
                              controller: 'WarehouseEditController',
                              resolve: {
                                  taxonomy: promiseProvider.query('Taxonomy'),
                                  product: promiseProvider.get('Product'),
                                  files: function ($q, $route, Attachment) {
                                      var d = $q.defer(),
                                          id = parseInt($route.current.params.id, 10);
                                      Attachment.query({item_id: id}, function (data) {
                                          d.resolve(data.objects)
                                      }, d.reject);
                                      return d.promise;
                                  }
                              }
                          })
                    .when(urls.cardOut(), {
                              templateUrl: templatesDir + 'card-out.html',
                              controller: 'WarehouseCardOutController',
                              resolve: {
                                  product: promiseProvider.get('Product'),
                                  contragents: promiseProvider.query('Contragent')
                              }
                          })
                    .when(urls.cardIn(), {
                              templateUrl: templatesDir + 'card-in.html',
                              controller: 'WarehouseCardInController',
                              resolve: {
                                  product: promiseProvider.get('Product'),
                                  contragents: promiseProvider.query('Contragent')
                              }
                          })
                    .when(urls.card(), {
                              templateUrl: templatesDir + 'card.html',
                              controller: 'WarehouseCardController',
                              resolve: {
                                  product: promiseProvider.get('Product'),
                                  operations: promiseProvider.cardOperations,
                                  contragents: promiseProvider.query('Contragent')
                              }
                          })
                    .otherwise({redirectTo: urls.main()});
            })

;