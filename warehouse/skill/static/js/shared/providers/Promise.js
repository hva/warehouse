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
            // $routeProvider.when('...', {
            //     resolve: {
            //         objects: promiseProvider.query('ResourceName')
            //     }
            // })
            query: function (resourceName) {
                var func = function ($q, resource) {
                    var deferred = $q.defer();
                    resource.query(function (d) {
                        deferred.resolve(d.objects);
                    });
                    return deferred.promise;
                };
                func.$inject = ['$q', resourceName];
                return func;
            }

        }
    })

;