angular.module('taxonomy', ['taxonomy.service']);

var TaxonomyController = function($scope, Taxonomy) {

    $scope.add = function() {
        var t = new Taxonomy();
        t.$save();
    };

};