'use strict';

var app = angular.module('app', [ 'controllers']);
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
'use strict';

angular.module('controllers', []);
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
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//


