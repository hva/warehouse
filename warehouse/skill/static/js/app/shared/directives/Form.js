angular.module('wh.shared.form', [])

    .constant('formColumns', 6)
    .constant('labelColumns', 5)
    .constant('inputColumns', 7)

    .constant('formTemplatesDir', '/static/js/app/shared/views/form/')

    .directive('whFormForm', function (formColumns, formTemplatesDir) {

        return {
            restrict: 'A',
            transclude: true,
            replace: true,
            templateUrl: formTemplatesDir + 'form.html',
            link: function (scope) {
                scope.formColumns = formColumns;
            }
        };
    })

    .directive('whFormInput', function (labelColumns, inputColumns, formTemplatesDir) {

        function findInput(el) {
            var input = el.find('input');
            if (!input.length) {
                input = el.find('select');
            }
            return input;
        }

        return {
            restrict: 'A',
            transclude: true,
            replace: true,
            templateUrl: formTemplatesDir + 'element.html',
            scope: {
                label: '@'
            },
            link: function (scope, element) {
                scope.labelColumns = labelColumns;
                scope.inputColumns = inputColumns;
                var input = findInput(element),
                    id = input.attr('name') + '-label';
                scope.inputId = id;
                input.attr('id', id);
            }
        };
    })

    .directive('whFormSubmit', function (labelColumns, inputColumns, formTemplatesDir) {

        return {
            restrict: 'A',
            transclude: true,
            replace: true,
            templateUrl: formTemplatesDir + 'submit.html',
            link: function (scope) {
                scope.labelColumns = labelColumns;
                scope.inputColumns = inputColumns;
            }
        };
    })


    .directive('whFormStatic', function (labelColumns, inputColumns, formTemplatesDir) {

        return {
            restrict: 'A',
            transclude: true,
            replace: true,
            templateUrl: formTemplatesDir + 'static.html',
            scope: {
                label: '@'
            },
            link: function (scope) {
                scope.labelColumns = labelColumns;
                scope.inputColumns = inputColumns;
            }
        };
    })

    .directive('whFormFocus', function () {

        return function (scope, element) {
            element[0].focus();
        };
    })


;
