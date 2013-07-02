angular.module('wh.shared.form', [])

    .constant('formColumns', 6)
    .constant('labelColumns', 5)
    .constant('inputColumns', 7)

    .directive('whFormForm', function (formColumns) {

        return {
            restrict: 'A',
            transclude: true,
            replace: true,
            templateUrl: '/static/js/shared/views/form/form.html',
            link: function (scope) {
                scope.formColumns = formColumns;
            }
        };
    })

    .directive('whFormInput', function (labelColumns, inputColumns) {

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
            templateUrl: '/static/js/shared/views/form/element.html',
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

    .directive('whFormSubmit', function (labelColumns, inputColumns) {

        return {
            restrict: 'A',
            transclude: true,
            replace: true,
            templateUrl: '/static/js/shared/views/form/submit.html',
            link: function (scope) {
                scope.labelColumns = labelColumns;
                scope.inputColumns = inputColumns;
            }
        };
    })


    .directive('whFormStatic', function (labelColumns, inputColumns) {

        return {
            restrict: 'A',
            transclude: true,
            replace: true,
            templateUrl: '/static/js/shared/views/form/static.html',
            scope: {
                label: '@'
            },
            link: function (scope) {
                scope.labelColumns = labelColumns;
                scope.inputColumns = inputColumns;
            }
        };
    })

;
