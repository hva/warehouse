angular.module('wh.shared.format', [])

    .constant('INTEGER_REGEXP', /^\-?\d*$/)
    .constant('FLOAT_REGEXP', /^\-?\d+((\.|\,)\d+)?$/)

    .directive('whFormatPrice', function (INTEGER_REGEXP) {
        return {
            require: '?ngModel',
            link: function (scope, elem, attrs, ctrl) {
                if (!ctrl) return;

                ctrl.$parsers.unshift(function (viewValue) {
                    var isValid = false,
                        value = undefined;

                    if (INTEGER_REGEXP.test(viewValue)) {
                        var intValue = parseInt(viewValue, 10);
                        if (intValue > 0) {
                            value = intValue;
                            isValid = true;
                        }
                    }
                    ctrl.$setValidity('price', isValid);
                    return value;
                });

            }
        };
    })

;