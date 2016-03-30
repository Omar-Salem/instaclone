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
            localStorage.setItem("userId", userId);
            getImagesByUserId(userId);
        }, function (response) {
            alert('error')
        });


        function getImagesByUserId(userId) {
            function preprocessImages(data) {
                $scope.images = [];

                var columnCount = 4;

                for (row = 0; row < data.images.length / columnCount; row++) {
                    $scope.images[row] = [];
                }

                var imgCount = 0;
                for (row = 0; row < data.images.length; row++) {
                    for (var j = 0; j < columnCount && imgCount < data.images.length; j++) {
                        $scope.images[row % $scope.images.length][j] = data.images[imgCount++];
                    }
                }
            }

            $http.get('/api/images/' + userId, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/plain'
                }
            }).then(function (response) {
                var data = response.data;
                preprocessImages(data);
                $scope.canEdit = data.can_edit;
            }, function (response) {
                alert('error');
            });
        }
    });
