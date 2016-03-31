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
                data.images = addExtraAttributes(data.images);
                //debugger;
                $scope.images = putInMatrix(data.images);
                $scope.canEdit = data.can_edit;
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
            }, function (response) {
                alert('error')
            });
        }
    });