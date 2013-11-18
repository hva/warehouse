angular.module('app', ['warehouse'])

    .config(function ($httpProvider, csrf_token) {
        $httpProvider.defaults.headers.common['X-CSRFToken'] = csrf_token;

        // bug in angular 1.0.6
        // PATCH requests use 'application/xml' content type
        // maybe will be fixed later
        $httpProvider.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
    })

;