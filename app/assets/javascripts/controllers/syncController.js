angular.module('controllers').controller(
    'syncController',
    function ($scope, $window, $http) {
        var url = $window.location.href;
        var idx = url.indexOf("=");
        var token = url.substring(idx + 1);

        get_user_details();

        function get_user_details() {
            $http.post('/users/get_user_details', {token: token}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/plain'
                }
            }).then(function (response) {
                alert(response.data);
            }, function (response) {
                alert('error')
            });
        }

        function sync_media() {
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
        }
    });