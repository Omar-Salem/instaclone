angular.module('controllers').controller(
    'imagesController',
    function ($scope, $window, $http) {
        var url = $window.location.href;
        var idx = url.lastIndexOf("/");
        var userName = url.substring(idx + 1);

        $http.get('/api/images/get_id/' + userName, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            }
        }).then(function (response) {
            userId = response.data;
            localStorage.setItem("username", userId);
            getImagesById(userId);
        }, function (response) {
            alert('error')
        });


        function getImagesById(userId) {
            $http.get('/api/images/' + userId, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/plain'
                }
            }).then(function (response) {
                alert(response.data);
            }, function (response) {
                alert('error');
            });
        }
    });