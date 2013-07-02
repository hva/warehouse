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
    .filter('whProductMarginVat', function () {
        return function (p) {
            if (!p) return null;

            var price = p.price || 0,
                margin = p.margin || 0,
                vat = p.vat || 0;

            return price * ((margin + vat) / 100 + 1);
        }
    })

    // отпускная цена за м. (c НДС)
    .filter('whProductMarginVatK', function () {
        return function (p) {
            if (!p) return null;

            var price = p.price || 0,
                margin = p.margin || 0,
                vat = p.vat || 0,
                k = p.k || 0,
                value = price * ((margin + vat) / 100 + 1) * k / 1000;

            return Math.ceil(value / 10) * 10;
        }
    })

;