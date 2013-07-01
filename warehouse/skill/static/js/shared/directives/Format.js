angular.module('wh.shared.format', [])

    .directive('whFormatDecimal', function ($filter, $locale) {
        return {
            require: '?ngModel',
            link: function (scope, elem, attrs, ctrl) {
                if (!ctrl) return;

                var convert = function (x) {
                    return $filter('number')(x);
                }

                ctrl.$formatters.unshift(convert);

                //view -> model
                ctrl.$parsers.unshift(function (viewValue) {
                    // strip spaces
                    var intValue = viewValue.replace(/\s+/g, '');
                    if (/^\-?\d*$/.test(intValue)) {
                        ctrl.$setValidity('integer', true);

                        var converted = convert(intValue);

                        if (!angular.equals(viewValue, converted)) {
                            ctrl.$setViewValue(converted);
                            ctrl.$render();
                        }

                        return intValue;
                    } else {
                        ctrl.$setValidity('integer', false);
                        return undefined;
                    }
                });
            }
        };
    })

;