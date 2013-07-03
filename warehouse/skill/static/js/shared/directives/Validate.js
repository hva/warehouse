angular.module('wh.shared.validate', [])

//    .constant('INTEGER_REGEXP', /^\-?\d*$/)
    .constant('FLOAT_REGEXP', /^\-?\d+((\.|\,)\d+)?$/)

//    .directive('whFormatPrice', function (INTEGER_REGEXP) {
//        return {
//            require: '?ngModel',
//            link: function (scope, elem, attrs, ctrl) {
//                if (!ctrl) return;
//
//                ctrl.$parsers.unshift(function (viewValue) {
//                    var isValid = false,
//                        value = undefined;
//
//                    if (INTEGER_REGEXP.test(viewValue)) {
//                        var intValue = parseInt(viewValue, 10);
//                        if (intValue > 0) {
//                            value = intValue;
//                            isValid = true;
//                        }
//                    }
//                    ctrl.$setValidity('price', isValid);
//                    return value;
//                });
//
//            }
//        };
//    })

    .directive('whFloat', function (FLOAT_REGEXP) {
        return {
            require: '?ngModel',
            link: function (scope, elem, attrs, ctrl) {
                if (!ctrl) return;

                ctrl.$parsers.unshift(function (value) {
                    if (FLOAT_REGEXP.test(value)) {
                        ctrl.$setValidity('float', true);
                        return parseFloat(value.replace(',', '.'));
                    } else {
                        ctrl.$setValidity('float', false);
                        return undefined;
                    }
                });
            }
        };
    })

    .directive('whRange', function () {
        return {
            require: '?ngModel',
            link: function (scope, elem, attrs, ctrl) {
                if (!ctrl) return;

                var lt, lte, gt, gte;

                attrs.$observe('lt', function (x) {
                    lt = parseFloat(x);
                });
                attrs.$observe('lte', function (x) {
                    lte = parseFloat(x);
                });
                attrs.$observe('gt', function (x) {
                    gt = parseFloat(x);
                });
                attrs.$observe('gte', function (x) {
                    gte = parseFloat(x);
                });

                var validate = function (value) {
                    var isValidLt = true,
                        isValidLte = true,
                        isValidGt = true,
                        isValidGte = true;
                    if (angular.isNumber(value)) {
                        if (angular.isNumber(lt) && !(value < lt)) {
                            isValidLt = false;
                        }
                        if (angular.isNumber(lte) && !(value <= lte)) {
                            isValidLte = false;
                        }
                        if (angular.isNumber(gt) && !(value > gt)) {
                            isValidGt = false;
                        }
                        if (angular.isNumber(gte) && !(value >= gte)) {
                            isValidGte = false;
                        }
                    }
                    ctrl.$setValidity('rangeLt', isValidLt);
                    ctrl.$setValidity('rangeLte', isValidLte);
                    ctrl.$setValidity('rangeGt', isValidGt);
                    ctrl.$setValidity('rangeGte', isValidGte);
                    ctrl.$setValidity('range', isValidLt && isValidLte && isValidGt && isValidGte);
                    return value;
                };

                ctrl.$parsers.push(validate);
                ctrl.$formatters.push(validate);
            }
        };
    })

;