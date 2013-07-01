angular.module('wh.shared.form', [])

    .constant('formColumns', 6)
    .constant('labelColumns', 4)
    .constant('inputColumns', 8)

    .directive('whFormElement', function (labelColumns, inputColumns) {

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
;
