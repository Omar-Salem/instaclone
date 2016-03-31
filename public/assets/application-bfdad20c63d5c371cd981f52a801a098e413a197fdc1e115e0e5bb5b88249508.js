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
            var userId = response.data;
            localStorage.setItem("userId", userId);
            getImagesByUserId(userId);
        }, function (response) {
            alert('error')
        });


        function getImagesByUserId(userId) {

            $http.get('/api/images/' + userId, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/plain'
                }
            }).then(function (response) {
                var data = response.data;
                $scope.images = data.images;
                if (data.can_edit) {
                    data.images = addExtraAttributes(data.images);
                }
                $scope.matrix = putInMatrix(data.images);
            }, function (response) {
                alert('error');
            });
        }

        function addExtraAttributes(arr) {
            return arr.map(extendObject);

            function extendObject(obj) {
                return angular.extend(obj, {
                    editMode: false,
                    customHref: obj.href,
                    beginEdit: function () {
                        obj.editMode = true;
                    },
                    submit: function () {
                        obj.editMode = false;
                        submitCustomHref(obj.id, obj.customHref);
                    },
                    cancel: function () {
                        obj.editMode = false;
                        obj.customHref = obj.href;
                    }
                });
            }
        }

        function putInMatrix(data) {
            var images = [];

            var columnCount = 4;

            for (var row = 0; row < data.length / columnCount; row++) {
                images[row] = [];
            }

            var imgCount = 0;
            for (row = 0; row < data.length; row++) {
                for (var j = 0; j < columnCount && imgCount < data.length; j++) {
                    images[row % images.length][j] = data[imgCount++];
                }
            }

            return images;
        }

        function submitCustomHref(id, href) {
            $http.post('/api/images/edit', {id: id, href: href}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/plain',
                    'token': localStorage.getItem("token")
                }
            }).then(function (response) {
                if (response.status == 200) {
                    var image = binarySearch($scope.images, id, 0, $scope.images.length);
                    image.href = href;
                }
            }, function (response) {
                alert('error')
            });
        }

        function binarySearch(arr, key, low, high) {
            while (low <= high) {
                var middle = ~~((low + high) / 2);

                if (arr[middle].id == key) {
                    return arr[middle];
                }
                else if (key > arr[middle].id) {
                    low = middle + 1;
                } else {
                    high = middle - 1;
                }
            }

            alert('Error:could not find object');
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


