angular.module('controllers').controller(
    'syncController',
    function ($scope, $window, $http) {
        var url = $window.location.href;
        var idx = url.indexOf("=");
        var token = url.substring(idx + 1);

        $http.post('/users/sync_media', {token: token}, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function (response) {
            alert(response.data)
        }, function (response) {
            alert('error')
        });
    });