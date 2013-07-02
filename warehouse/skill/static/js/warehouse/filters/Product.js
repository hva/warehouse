angular.module('warehouse.filters')

    // отпускная цена за т. (без НДС)
    .filter('whProductMargin', function () {
        return function (p) {
            if (!p) return null;

            var price = p.price || 0,
                margin = p.margin || 0;

            return price * (margin / 100 + 1);
        }
    })

    // отпускная цена за т. (c НДС)
    .filter('whProductMarginVat', function ($filter) {
        return function (p) {
            if (!p) return null;

            var prev = $filter('whProductMargin')(p),
                vat = p.vat || 0;

            return prev + prev * vat / 100;
        }
    })

    // отпускная цена за м. (c НДС)
    .filter('whProductMarginVatK', function ($filter) {
        return function (p) {
            if (!p) return null;

            var prev = $filter('whProductMarginVat')(p),
                k = p.k || 0,
                value = prev * k / 1000;

            return Math.round(value / 10) * 10;
        }
    })

;