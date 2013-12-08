angular.module('wh.shared.urls', [])

    .provider('urls', function () {
        return {
            _routes: {},
            $get: function () {
                return this._routes;
            }
        }
    })
;
