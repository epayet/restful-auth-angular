angular.module("auth-controllers").controller("IndexController", ['$scope', '$auth', 'User',
    function ($scope, $auth, User) {
        $scope.email = "mail";
        $scope.password = "pass";
        update();

        $scope.login = function() {
            $auth.login({
                email: $scope.email,
                password: $scope.password
            }).then(function() {
                update();
            });
        };

        $scope.logout = function() {
            $auth.logout();
            update()
        };

        $scope.getUser = function() {
            $scope.user = User.get();
            update()
        };

        function update() {
            $scope.isAuthenticated = $auth.isAuthenticated();
        }
    }]);
