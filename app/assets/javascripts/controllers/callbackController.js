angular.module('controllers').controller(
    'callbackController',
    function ($scope, $window, $http) {
        var url = $window.location.href;
        var idx = url.indexOf("=");
        var token = url.substring(idx + 1);

        get_user_details(token);

        function get_user_details(token) {
            $http.post('/api/users/get_user_details', {token: token}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/plain'
                }
            }).then(function (response) {
                var data = response.data;
                localStorage.setItem("token", data.token);
                $window.location.href = '/' + data.username;
            }, function (response) {
                alert('error')
            });
        }

        //function sync_media() {
        //    $http.post('/users/sync_media', {}, {
        //        headers: {
        //            'Content-Type': 'application/json',
        //            'Accept': 'application/json',
        //            'token': localStorage.getItem("token")
        //        }
        //    }).then(function (response) {
        //        //alert(response.data)
        //    }, function (response) {
        //        alert('error')
        //    });
        //}
    });