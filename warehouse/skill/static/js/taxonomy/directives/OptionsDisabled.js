// http://jsfiddle.net/alalonde/dZDLg/9/

angular.module('shared.optionsDisabled', [])

    .directive('optionsDisabled', function ($parse) {
        var disableOptions = function (scope, attr, element, data, fnDisableIfTrue) {
            // refresh the disabled options in the select element.
            var options = element.find('option');
            angular.forEach(options, function (o) {
                var locals = {},
                    option = angular.element(o),
                    val = option.val();
                if (!isNaN(parseInt(val, 10))) {
                    locals[attr] = data[val];
                    option.attr("disabled", fnDisableIfTrue(scope, locals));
                }
            });
        };
        return {
            priority: 0,
            require: 'ngModel',
            link: function (scope, iElement, iAttrs, ctrl) {
                // parse expression and build array of disabled options
                var expElements = iAttrs.optionsDisabled.match(/^\s*(.+)\s+for\s+(.+)\s+in\s+(.+)?\s*/);
                var attrToWatch = expElements[3];
                var fnDisableIfTrue = $parse(expElements[1]);
                scope.$watch(attrToWatch, function (newValue, oldValue) {
                    if (newValue)
                        disableOptions(scope, expElements[2], iElement, newValue, fnDisableIfTrue);
                }, true);
                // handle model updates properly
                scope.$watch(iAttrs.ngModel, function (newValue, oldValue) {
                    var disOptions = $parse(attrToWatch)(scope);
                    if (newValue && disOptions)
                        disableOptions(scope, expElements[2], iElement, disOptions, fnDisableIfTrue);
                });
            }
        };
    });
