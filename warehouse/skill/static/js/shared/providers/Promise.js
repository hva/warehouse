angular.module('wh.shared.promise', [])

    .provider('promise', function () {
        return {
            $get: angular.noop,

            delay: function (interval) {
                return function ($q, $timeout) {
                    var delay = $q.defer();
                    $timeout(delay.resolve, interval);
                    return delay.promise;
                }
            },

            query: function ($q, Taxonomy) {
                var deferred = $q.defer();
                Taxonomy.query(function (d) {
                    deferred.resolve(d.objects);
                });
                return deferred.promise;
            }

        }
    })

;