angular.module('wh.shared.promise', [])

    .provider('promise', function () {
        return {
            // making angular happy
            $get: angular.noop,

            // fake promise to emulate long running requests
            // $routeProvider.when('...', {
            //     resolve: {
            //         delay: promiseProvider.delay
            //     }
            // })

            delay: function ($q, $timeout) {
                var delay = $q.defer();
                $timeout(delay.resolve, 500);
                return delay.promise;
            },


            // resource query promise
            // params:
            //     resourceName - {string} - name of the resource to be injected
            //
            // example:
            // $routeProvider.when('...', {
            //     resolve: {
            //         objects: promiseProvider.query('ResourceName')
            //     }
            // })
            query: function (resourceName) {
                var func = function ($q, resource) {
                    var deferred = $q.defer();
                    resource.query(
                        function (d) {
                            deferred.resolve(d.objects);
                        },
                        deferred.reject
                    );
                    return deferred.promise;
                };
                func.$inject = ['$q', resourceName];
                return func;
            },

            // resource get promise ('id' will be taken from $routeParams)
            // params:
            //     resourceName - {string} - name of the resource to be injected
            //
            //example:
            // $routeProvider.when('...', {
            //     resolve: {
            //         object: promiseProvider.get('ResourceName')
            //     }
            // })
            get: function (resourceName) {
                var func = function ($q, $route, resource) {
                    var deferred = $q.defer(),
                        id = $route.current.params.id;
                    resource.get({id: id}, deferred.resolve, deferred.reject);
                    return deferred.promise;
                };
                func.$inject = ['$q', '$route', resourceName];
                return func;
            }

        }
    })

;