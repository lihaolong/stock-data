"use strict";
var app = angular.module('manager.pad',
    ['ngRoute', 'ngSanitize',
    'ui.router',
    'angular-timeline',
    'angular-scroll-animate']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .otherwise({
            redirectTo: '/apps'
        });
}]);

/* Controllers */
app.controller('index',  ['$scope', '$location', '$rootScope', '$routeParams','indexService', function ($scope, $location, $rootScope, $routeParams, indexService) {
    var vm = $scope.vm = {};
}]);
/* Services */
app.service('indexService',['ajaxService', function (ajaxService) {
}]);

