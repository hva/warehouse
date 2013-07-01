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

    .directive('whFormatFloat', function (FLOAT_REGEXP) {
        return {
            require: '?ngModel',
            link: function (scope, elem, attrs, ctrl) {
                if (!ctrl) return;

                ctrl.$parsers.unshift(function (viewValue) {
                    var isValid = false,
                        value = undefined;

                    if (FLOAT_REGEXP.test(viewValue)) {
                        var floatValue = parseFloat(viewValue.replace(',', '.'));
                        if (floatValue > 0) {
                            value = floatValue;
                            isValid = true;
                        }
                    }
                    ctrl.$setValidity('float', isValid);
                    return value;
                });

            }
        };
    })

;