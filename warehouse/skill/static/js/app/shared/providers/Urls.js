angular.module('wh.shared.urls', [])

    .provider('urls', function () {
        return {
            _routes: {
                warehouse: {},
                taxonomy: {}
            },
            $get: function () {
                return this._routes;
            }
        }
    })
;
