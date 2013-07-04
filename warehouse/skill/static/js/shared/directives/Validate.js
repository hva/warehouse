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
                    if (angular.isNumber(value)) {
                        if (!isNaN(lt)) {
                            ctrl.$setValidity('rangeLt', value < lt);
                        }
                        if (!isNaN(lte)) {
                            ctrl.$setValidity('rangeLte', value <= lte);
                        }
                        if (!isNaN(gt)) {
                            ctrl.$setValidity('rangeGt', value > gt);
                        }
                        if (!isNaN(gte)) {
                            ctrl.$setValidity('rangeGte', value >= gte);
                        }
                    } else {
                        ctrl.$setValidity('rangeLt', true);
                        ctrl.$setValidity('rangeLte', true);
                        ctrl.$setValidity('rangeGt', true);
                        ctrl.$setValidity('rangeGte', true);
                    }
                    return value;
                };

                ctrl.$parsers.push(validate);
                ctrl.$formatters.push(validate);
            }
        };
    })

;