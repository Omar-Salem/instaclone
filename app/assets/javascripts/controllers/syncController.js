angular.module('controllers').controller(
    'syncController',
    function ($scope, $window) {
        var url = $window.location.href;
        var idx = url.indexOf("=");
        var token = url.substring(idx + 1);
        alert(token)
    });