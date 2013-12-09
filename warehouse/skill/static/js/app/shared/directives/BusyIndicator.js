angular.module('wh.shared.busyIndicator', [])

    .directive('busyIndicator', function ($rootScope, $timeout) {
        return {
            restrict: 'C',
            link: function (scope, element) {
                var toBeDisplayed;

                $rootScope.$on('$routeChangeStart', function () {
                    toBeDisplayed = true;
                    // wait some time
                    $timeout(function () {
                        if (toBeDisplayed) {
                            // if still need to be displayed
                            element.addClass('show');
                        }
                    }, 200);
                });

                $rootScope.$on('$routeChangeSuccess', function () {
                    // don't need to be displayed
                    toBeDisplayed = false;
                    element.removeClass('show');
                });

                $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
                    // don't need to be displayed
                    toBeDisplayed = false;

                    alert('Loading data from server failed.\nPlease contact administrator.');
                });

            }
        };
    })

;